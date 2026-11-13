import { Mesh, OrthographicCamera, PlaneGeometry, Scene, ShaderMaterial, Vector2, WebGLRenderer } from "three";

const fragment = /* glsl */ `
precision highp float;
uniform float uTime;
uniform vec2 uRes;
uniform vec2 uPointer;
varying vec2 vUv;

float height(vec2 p) {
  float t = uTime * 0.11;
  float h = sin(p.x * 2.6 + p.y * 1.1 + t * 2.0 + sin(p.y * 1.7 + t) * 0.9) * 0.55;
  h += sin(p.x * 1.2 - p.y * 2.4 - t * 1.3 + sin(p.x * 0.8 - t * 0.6)) * 0.38;
  h += sin((p.x + p.y) * 4.6 + t * 2.6 + sin(p.x * 2.8 + t)) * 0.08;
  h += sin(length(p - uPointer * 1.5) * 3.2 - t * 4.0) * 0.05;
  return h;
}

void main() {
  vec2 p = (vUv - 0.5) * vec2(uRes.x / uRes.y, 1.0) * 2.2;
  float e = 0.004;
  float h = height(p);
  vec3 n = normalize(vec3(height(p - vec2(e, 0.0)) - height(p + vec2(e, 0.0)), height(p - vec2(0.0, e)) - height(p + vec2(0.0, e)), e * 4.0));

  vec3 light = normalize(vec3(-0.5 + uPointer.x * 0.35, 0.65 + uPointer.y * 0.25, 0.75));
  vec3 view = vec3(0.0, 0.0, 1.0);
  vec3 half_ = normalize(light + view);

  float diff = clamp(dot(n, light), 0.0, 1.0);
  vec3 tangent = normalize(vec3(0.82, 0.57, 0.0));
  float th = dot(tangent, half_);
  float aniso = pow(sqrt(max(0.0, 1.0 - th * th)), 90.0);
  float spec = pow(max(dot(n, half_), 0.0), 40.0);

  vec3 deep = vec3(0.17, 0.045, 0.08);
  vec3 burgundy = vec3(0.33, 0.105, 0.17);
  vec3 gold = vec3(0.78, 0.65, 0.42);

  vec3 col = mix(deep, burgundy, smoothstep(0.0, 1.0, diff * 0.9 + h * 0.15));
  col += gold * (aniso * 0.32 + spec * 0.18);

  float vig = smoothstep(1.35, 0.25, length((vUv - 0.5) * vec2(1.2, 1.0)));
  col *= mix(0.55, 1.0, vig);

  float grain = fract(sin(dot(gl_FragCoord.xy, vec2(12.9898, 78.233)) + uTime) * 43758.5453);
  col += (grain - 0.5) * 0.018;

  gl_FragColor = vec4(col, 1.0);
}
`;

const vertex = /* glsl */ `
varying vec2 vUv;
void main() { vUv = uv; gl_Position = vec4(position.xy, 0.0, 1.0); }
`;

export function startSilk(canvas: HTMLCanvasElement, onFirstFrame: () => void) {
  const renderer = new WebGLRenderer({ canvas, antialias: false, alpha: false, powerPreference: "low-power" });
  const coarse = matchMedia("(pointer: coarse)").matches;
  renderer.setPixelRatio(Math.min(devicePixelRatio, coarse ? 1 : 1.5));

  const uniforms = { uTime: { value: 0 }, uRes: { value: new Vector2(1, 1) }, uPointer: { value: new Vector2(0, 0) } };
  const scene = new Scene();
  const geometry = new PlaneGeometry(2, 2);
  const material = new ShaderMaterial({ vertexShader: vertex, fragmentShader: fragment, uniforms });
  scene.add(new Mesh(geometry, material));
  const camera = new OrthographicCamera(-1, 1, 1, -1, 0, 1);

  const target = new Vector2(0, 0);
  const resize = () => {
    const { clientWidth: w, clientHeight: h } = canvas;
    renderer.setSize(w, h, false);
    uniforms.uRes.value.set(w, h);
  };
  const ro = new ResizeObserver(resize);
  ro.observe(canvas);
  resize();

  const onPointer = (e: PointerEvent) => target.set((e.clientX / innerWidth) * 2 - 1, -((e.clientY / innerHeight) * 2 - 1));
  if (!coarse) addEventListener("pointermove", onPointer, { passive: true });

  let visible = true;
  const io = new IntersectionObserver(([entry]) => (visible = entry.isIntersecting));
  io.observe(canvas);

  let raf = 0;
  let last = 0;
  let first = true;
  const frameGap = coarse ? 1000 / 30 : 0;
  const start = performance.now();
  const loop = (now: number) => {
    raf = requestAnimationFrame(loop);
    if (!visible || document.hidden || now - last < frameGap) return;
    last = now;
    uniforms.uTime.value = (now - start) / 1000;
    uniforms.uPointer.value.lerp(target, 0.04);
    renderer.render(scene, camera);
    if (first) {
      first = false;
      onFirstFrame();
    }
  };
  raf = requestAnimationFrame(loop);

  return () => {
    cancelAnimationFrame(raf);
    ro.disconnect();
    io.disconnect();
    removeEventListener("pointermove", onPointer);
    geometry.dispose();
    material.dispose();
    renderer.dispose();
  };
}
