# Generating Angel's images in Gemini (free)

## Steps for each image

1. Open **gemini.google.com** and sign in with your Google account. Start a **new chat** for each image.
2. Click **+ → Upload file** and attach the matching preview from `assets-src/previews/`. The filename is the image ID below; `insta-06` is a `.png`, all others are `.jpg`.
3. Copy the prompt from the box and send it. If Gemini replies with text only, send: **"Generate the image."**
4. If the result is good, open the image and click **Download** (full size).
5. **Rename** the downloaded file to the image ID (e.g. `hero-desktop.png`). Put it in `public/images/incoming/`, or send it to me in chat.

Once a batch is in, tell me. I'll run `npm run images`, check every image, and update the site.

## Check before you download

- Hands look right: five fingers, no extra hands.
- The saree is draped correctly and the pleats look neat.
- There is no text, caption or filename anywhere in the image.
- If something is wrong, reply **"Regenerate — fix the hands"** (or whatever is wrong) instead of starting over.

The free plan has a daily image limit. If you hit it, carry on the next day. Images that are still missing keep using the current previews until you replace them.

---

## Batch 1 — home page (most visible)

### 1. `hero-desktop` — attach `assets-src/previews/hero-desktop.jpg`

```text
Recreate the attached photo as a sharp, high-resolution, finished photograph in landscape 16:9 aspect ratio. Keep the same subject, pose, styling, colours and mood. Remove the filename caption — the image must contain no text at all.

A young Kerala bride in an ivory Kerala silk saree with a broad gold zari border, gold temple necklaces and jasmine in her bun, smiling softly and looking down, pallu flowing in the air behind her, standing on the right side of the frame against a plain deep burgundy backdrop; generous empty burgundy space on the left.

Photorealistic editorial fashion photograph for a luxury Kerala bridal styling brand. Shot on a medium-format camera, 85mm lens, natural warm window light, soft shadows, warm slightly desaturated colour grade, subtle film grain, ivory, deep burgundy and antique gold palette. Realistic skin texture and realistic hands with five fingers. Sarees must be draped correctly with neat pleats. No text, no captions, no labels, no watermark, no logo, no borders.
```

### 2. `hero-mobile` — attach `assets-src/previews/hero-mobile.jpg`

```text
Recreate the attached photo as a sharp, high-resolution, finished photograph in portrait 3:4 aspect ratio. Keep the same subject, pose, styling, colours and mood. Remove the filename caption — the image must contain no text at all.

Vertical portrait of a young Kerala bride in an ivory and gold silk saree with jasmine in her hair, smiling softly and looking down, ivory silk pallu sweeping across the top of the frame, plain deep burgundy backdrop.

Photorealistic editorial fashion photograph for a luxury Kerala bridal styling brand. Shot on a medium-format camera, 85mm lens, natural warm window light, soft shadows, warm slightly desaturated colour grade, subtle film grain, ivory, deep burgundy and antique gold palette. Realistic skin texture and realistic hands with five fingers. Sarees must be draped correctly with neat pleats. No text, no captions, no labels, no watermark, no logo, no borders.
```

### 3. `hero-silk-poster` — attach `assets-src/previews/hero-silk-poster.jpg`

```text
Recreate the attached photo as a sharp, high-resolution, finished photograph in landscape 16:9 aspect ratio. Keep the same subject, pose, styling, colours and mood. Remove the filename caption — the image must contain no text at all.

Abstract close-up of deep burgundy silk fabric with soft flowing folds and a subtle gold sheen, no person, rich and quiet background texture.

Photorealistic editorial fashion photograph for a luxury Kerala bridal styling brand. Shot on a medium-format camera, 85mm lens, natural warm window light, soft shadows, warm slightly desaturated colour grade, subtle film grain, ivory, deep burgundy and antique gold palette. Realistic skin texture and realistic hands with five fingers. Sarees must be draped correctly with neat pleats. No text, no captions, no labels, no watermark, no logo, no borders.
```

### 4. `intro-pleats` — attach `assets-src/previews/intro-pleats.jpg`

```text
Recreate the attached photo as a sharp, high-resolution, finished photograph in portrait 4:5 aspect ratio. Keep the same subject, pose, styling, colours and mood. Remove the filename caption — the image must contain no text at all.

Close-up of a woman's hands holding and arranging even front pleats of an ivory and gold Kerala silk saree at the waist, gold bangle, shallow depth of field.

Photorealistic editorial fashion photograph for a luxury Kerala bridal styling brand. Shot on a medium-format camera, 85mm lens, natural warm window light, soft shadows, warm slightly desaturated colour grade, subtle film grain, ivory, deep burgundy and antique gold palette. Realistic skin texture and realistic hands with five fingers. Sarees must be draped correctly with neat pleats. No text, no captions, no labels, no watermark, no logo, no borders.
```

### 5. `artistry-consult` — attach `assets-src/previews/artistry-consult.jpg`

```text
Recreate the attached photo as a sharp, high-resolution, finished photograph in portrait 4:5 aspect ratio. Keep the same subject, pose, styling, colours and mood. Remove the filename caption — the image must contain no text at all.

Two Kerala women — a stylist in a burgundy top and a bride in an ivory and gold saree — sitting at a wooden table by a window, smiling and choosing among folded colourful silk sarees laid on the table.

Photorealistic editorial fashion photograph for a luxury Kerala bridal styling brand. Shot on a medium-format camera, 85mm lens, natural warm window light, soft shadows, warm slightly desaturated colour grade, subtle film grain, ivory, deep burgundy and antique gold palette. Realistic skin texture and realistic hands with five fingers. Sarees must be draped correctly with neat pleats. No text, no captions, no labels, no watermark, no logo, no borders.
```

### 6. `artistry-drape` — attach `assets-src/previews/artistry-drape.jpg`

```text
Recreate the attached photo as a sharp, high-resolution, finished photograph in portrait 4:5 aspect ratio. Keep the same subject, pose, styling, colours and mood. Remove the filename caption — the image must contain no text at all.

Close-up of a stylist's hands pinning the pallu of a burgundy and gold Kanjeevaram silk saree at a bride's shoulder, gold necklace visible, face out of frame.

Photorealistic editorial fashion photograph for a luxury Kerala bridal styling brand. Shot on a medium-format camera, 85mm lens, natural warm window light, soft shadows, warm slightly desaturated colour grade, subtle film grain, ivory, deep burgundy and antique gold palette. Realistic skin texture and realistic hands with five fingers. Sarees must be draped correctly with neat pleats. No text, no captions, no labels, no watermark, no logo, no borders.
```

### 7. `artistry-reveal` — attach `assets-src/previews/artistry-reveal.jpg`

```text
Recreate the attached photo as a sharp, high-resolution, finished photograph in portrait 4:5 aspect ratio. Keep the same subject, pose, styling, colours and mood. Remove the filename caption — the image must contain no text at all.

A Kerala bride in a pink and gold silk saree with jasmine in her bun, seen from behind in three-quarter view, standing by a tall wooden window in soft light.

Photorealistic editorial fashion photograph for a luxury Kerala bridal styling brand. Shot on a medium-format camera, 85mm lens, natural warm window light, soft shadows, warm slightly desaturated colour grade, subtle film grain, ivory, deep burgundy and antique gold palette. Realistic skin texture and realistic hands with five fingers. Sarees must be draped correctly with neat pleats. No text, no captions, no labels, no watermark, no logo, no borders.
```

### 8. `bridal-feature` — attach `assets-src/previews/bridal-feature.jpg`

```text
Recreate the attached photo as a sharp, high-resolution, finished photograph in portrait 4:5 aspect ratio. Keep the same subject, pose, styling, colours and mood. Remove the filename caption — the image must contain no text at all.

Full-length portrait of a South Indian bride in a deep red and gold Kanjeevaram silk saree with gold jewellery, standing in a carved dark wooden Kerala tharavadu doorway.

Photorealistic editorial fashion photograph for a luxury Kerala bridal styling brand. Shot on a medium-format camera, 85mm lens, natural warm window light, soft shadows, warm slightly desaturated colour grade, subtle film grain, ivory, deep burgundy and antique gold palette. Realistic skin texture and realistic hands with five fingers. Sarees must be draped correctly with neat pleats. No text, no captions, no labels, no watermark, no logo, no borders.
```

### 9. `occasions-feature` — attach `assets-src/previews/occasions-feature.jpg`

```text
Recreate the attached photo as a sharp, high-resolution, finished photograph in portrait 4:5 aspect ratio. Keep the same subject, pose, styling, colours and mood. Remove the filename caption — the image must contain no text at all.

A smiling Kerala woman in a burgundy silk saree with a gold border at an evening reception, warm blurred bokeh lights in the background.

Photorealistic editorial fashion photograph for a luxury Kerala bridal styling brand. Shot on a medium-format camera, 85mm lens, natural warm window light, soft shadows, warm slightly desaturated colour grade, subtle film grain, ivory, deep burgundy and antique gold palette. Realistic skin texture and realistic hands with five fingers. Sarees must be draped correctly with neat pleats. No text, no captions, no labels, no watermark, no logo, no borders.
```

---

## Batch 2 — service pages

### 10. `svc-bridal-saree-draping` — attach `assets-src/previews/svc-bridal-saree-draping.jpg`

```text
Recreate the attached photo as a sharp, high-resolution, finished photograph in portrait 4:5 aspect ratio. Keep the same subject, pose, styling, colours and mood. Remove the filename caption — the image must contain no text at all.

Close mid-shot of a bride in a red and gold silk bridal saree with layered traditional gold necklaces, face cropped at the chin, focus on drape and jewellery.

Photorealistic editorial fashion photograph for a luxury Kerala bridal styling brand. Shot on a medium-format camera, 85mm lens, natural warm window light, soft shadows, warm slightly desaturated colour grade, subtle film grain, ivory, deep burgundy and antique gold palette. Realistic skin texture and realistic hands with five fingers. Sarees must be draped correctly with neat pleats. No text, no captions, no labels, no watermark, no logo, no borders.
```

### 11. `svc-kanjeevaram-bridal` — attach `assets-src/previews/svc-kanjeevaram-bridal.jpg`

```text
Recreate the attached photo as a sharp, high-resolution, finished photograph in portrait 4:5 aspect ratio. Keep the same subject, pose, styling, colours and mood. Remove the filename caption — the image must contain no text at all.

A Kerala bride in a magenta and gold Kanjeevaram silk saree with gold jewellery, standing beside a tall brass oil lamp (nilavilakku), warm interior light.

Photorealistic editorial fashion photograph for a luxury Kerala bridal styling brand. Shot on a medium-format camera, 85mm lens, natural warm window light, soft shadows, warm slightly desaturated colour grade, subtle film grain, ivory, deep burgundy and antique gold palette. Realistic skin texture and realistic hands with five fingers. Sarees must be draped correctly with neat pleats. No text, no captions, no labels, no watermark, no logo, no borders.
```

### 12. `svc-kerala-kasavu` — attach `assets-src/previews/svc-kerala-kasavu.jpg`

```text
Recreate the attached photo as a sharp, high-resolution, finished photograph in portrait 4:5 aspect ratio. Keep the same subject, pose, styling, colours and mood. Remove the filename caption — the image must contain no text at all.

A smiling Kerala woman in an ivory kasavu saree with gold border and jasmine in her hair, standing in a green tropical garden in soft daylight.

Photorealistic editorial fashion photograph for a luxury Kerala bridal styling brand. Shot on a medium-format camera, 85mm lens, natural warm window light, soft shadows, warm slightly desaturated colour grade, subtle film grain, ivory, deep burgundy and antique gold palette. Realistic skin texture and realistic hands with five fingers. Sarees must be draped correctly with neat pleats. No text, no captions, no labels, no watermark, no logo, no borders.
```

### 13. `svc-bridal-package` — attach `assets-src/previews/svc-bridal-package.jpg`

```text
Recreate the attached photo as a sharp, high-resolution, finished photograph in portrait 4:5 aspect ratio. Keep the same subject, pose, styling, colours and mood. Remove the filename caption — the image must contain no text at all.

A Kerala bride in an ivory and gold silk saree with gold jewellery walking along a pillared traditional corridor, full-length, soft daylight.

Photorealistic editorial fashion photograph for a luxury Kerala bridal styling brand. Shot on a medium-format camera, 85mm lens, natural warm window light, soft shadows, warm slightly desaturated colour grade, subtle film grain, ivory, deep burgundy and antique gold palette. Realistic skin texture and realistic hands with five fingers. Sarees must be draped correctly with neat pleats. No text, no captions, no labels, no watermark, no logo, no borders.
```

### 14. `svc-bridal-makeup` — attach `assets-src/previews/svc-bridal-makeup.jpg`

```text
Recreate the attached photo as a sharp, high-resolution, finished photograph in portrait 4:5 aspect ratio. Keep the same subject, pose, styling, colours and mood. Remove the filename caption — the image must contain no text at all.

A makeup artist's brush applying soft blush to a smiling Kerala bride's cheek, jasmine flowers in her hair, warm light, close-up.

Photorealistic editorial fashion photograph for a luxury Kerala bridal styling brand. Shot on a medium-format camera, 85mm lens, natural warm window light, soft shadows, warm slightly desaturated colour grade, subtle film grain, ivory, deep burgundy and antique gold palette. Realistic skin texture and realistic hands with five fingers. Sarees must be draped correctly with neat pleats. No text, no captions, no labels, no watermark, no logo, no borders.
```

### 15. `svc-hair-styling` — attach `assets-src/previews/svc-hair-styling.jpg`

```text
Recreate the attached photo as a sharp, high-resolution, finished photograph in portrait 4:5 aspect ratio. Keep the same subject, pose, styling, colours and mood. Remove the filename caption — the image must contain no text at all.

Back view of a bride's low bun decorated with white jasmine strands and a small gold hair ornament, gold earrings, soft warm background.

Photorealistic editorial fashion photograph for a luxury Kerala bridal styling brand. Shot on a medium-format camera, 85mm lens, natural warm window light, soft shadows, warm slightly desaturated colour grade, subtle film grain, ivory, deep burgundy and antique gold palette. Realistic skin texture and realistic hands with five fingers. Sarees must be draped correctly with neat pleats. No text, no captions, no labels, no watermark, no logo, no borders.
```

### 16. `svc-saree-styling` — attach `assets-src/previews/svc-saree-styling.jpg`

```text
Recreate the attached photo as a sharp, high-resolution, finished photograph in portrait 4:5 aspect ratio. Keep the same subject, pose, styling, colours and mood. Remove the filename caption — the image must contain no text at all.

Close-up of a woman's shoulder and arm wearing a burgundy silk saree with ornate gold woven motifs and a gold necklace, face partly out of frame.

Photorealistic editorial fashion photograph for a luxury Kerala bridal styling brand. Shot on a medium-format camera, 85mm lens, natural warm window light, soft shadows, warm slightly desaturated colour grade, subtle film grain, ivory, deep burgundy and antique gold palette. Realistic skin texture and realistic hands with five fingers. Sarees must be draped correctly with neat pleats. No text, no captions, no labels, no watermark, no logo, no borders.
```

### 17. `svc-accessories` — attach `assets-src/previews/svc-accessories.jpg`

```text
Recreate the attached photo as a sharp, high-resolution, finished photograph in portrait 4:5 aspect ratio. Keep the same subject, pose, styling, colours and mood. Remove the filename caption — the image must contain no text at all.

Close-up of a bride's neck and chest wearing a gold temple necklace with green emerald stones over a red and gold silk saree, face cropped above the lips.

Photorealistic editorial fashion photograph for a luxury Kerala bridal styling brand. Shot on a medium-format camera, 85mm lens, natural warm window light, soft shadows, warm slightly desaturated colour grade, subtle film grain, ivory, deep burgundy and antique gold palette. Realistic skin texture and realistic hands with five fingers. Sarees must be draped correctly with neat pleats. No text, no captions, no labels, no watermark, no logo, no borders.
```

### 18. `svc-bridal-consultation` — attach `assets-src/previews/svc-bridal-consultation.jpg`

```text
Recreate the attached photo as a sharp, high-resolution, finished photograph in portrait 4:5 aspect ratio. Keep the same subject, pose, styling, colours and mood. Remove the filename caption — the image must contain no text at all.

A stylist in a burgundy top and a bride in a burgundy and gold saree sitting together at a table looking through a bridal styling book, smiling, warm interior with plants.

Photorealistic editorial fashion photograph for a luxury Kerala bridal styling brand. Shot on a medium-format camera, 85mm lens, natural warm window light, soft shadows, warm slightly desaturated colour grade, subtle film grain, ivory, deep burgundy and antique gold palette. Realistic skin texture and realistic hands with five fingers. Sarees must be draped correctly with neat pleats. No text, no captions, no labels, no watermark, no logo, no borders.
```

---

## Batch 3 — lookbook, details, Instagram

### 19. `lookbook-02` — attach `assets-src/previews/lookbook-02.jpg`

```text
Recreate the attached photo as a sharp, high-resolution, finished photograph in portrait 4:5 aspect ratio. Keep the same subject, pose, styling, colours and mood. Remove the filename caption — the image must contain no text at all.

A Kerala woman in an ivory kasavu saree sitting gracefully by a large wooden window in a heritage home, soft backlight, calm expression.

Photorealistic editorial fashion photograph for a luxury Kerala bridal styling brand. Shot on a medium-format camera, 85mm lens, natural warm window light, soft shadows, warm slightly desaturated colour grade, subtle film grain, ivory, deep burgundy and antique gold palette. Realistic skin texture and realistic hands with five fingers. Sarees must be draped correctly with neat pleats. No text, no captions, no labels, no watermark, no logo, no borders.
```

### 20. `lookbook-03` — attach `assets-src/previews/lookbook-03.jpg`

```text
Recreate the attached photo as a sharp, high-resolution, finished photograph in portrait 4:5 aspect ratio. Keep the same subject, pose, styling, colours and mood. Remove the filename caption — the image must contain no text at all.

A burgundy and gold Kanjeevaram silk saree draped over a carved antique wooden chair arm, rich gold motifs, no person.

Photorealistic editorial fashion photograph for a luxury Kerala bridal styling brand. Shot on a medium-format camera, 85mm lens, natural warm window light, soft shadows, warm slightly desaturated colour grade, subtle film grain, ivory, deep burgundy and antique gold palette. Realistic skin texture and realistic hands with five fingers. Sarees must be draped correctly with neat pleats. No text, no captions, no labels, no watermark, no logo, no borders.
```

### 21. `lookbook-04` — attach `assets-src/previews/lookbook-04.jpg`

```text
Recreate the attached photo as a sharp, high-resolution, finished photograph in portrait 4:5 aspect ratio. Keep the same subject, pose, styling, colours and mood. Remove the filename caption — the image must contain no text at all.

A smiling Kerala woman in a burgundy silk saree with gold border, resting her chin on her hand by a window, warm light.

Photorealistic editorial fashion photograph for a luxury Kerala bridal styling brand. Shot on a medium-format camera, 85mm lens, natural warm window light, soft shadows, warm slightly desaturated colour grade, subtle film grain, ivory, deep burgundy and antique gold palette. Realistic skin texture and realistic hands with five fingers. Sarees must be draped correctly with neat pleats. No text, no captions, no labels, no watermark, no logo, no borders.
```

### 22. `lookbook-01` — attach `assets-src/previews/lookbook-01.jpg`

```text
Recreate the attached photo as a sharp, high-resolution, finished photograph in portrait 4:5 aspect ratio. Keep the same subject, pose, styling, colours and mood. Remove the filename caption — the image must contain no text at all.

Folded Kanjeevaram silk sarees stacked on a surface — burgundy and gold, ivory and gold — showing rich woven zari borders, no person.

Photorealistic editorial fashion photograph for a luxury Kerala bridal styling brand. Shot on a medium-format camera, 85mm lens, natural warm window light, soft shadows, warm slightly desaturated colour grade, subtle film grain, ivory, deep burgundy and antique gold palette. Realistic skin texture and realistic hands with five fingers. Sarees must be draped correctly with neat pleats. No text, no captions, no labels, no watermark, no logo, no borders.
```

### 23. `why-detail` — attach `assets-src/previews/why-detail.jpg`

```text
Recreate the attached photo as a sharp, high-resolution, finished photograph in square 1:1 aspect ratio. Keep the same subject, pose, styling, colours and mood. Remove the filename caption — the image must contain no text at all.

Macro photograph of an ivory Kerala kasavu saree with a wide woven gold zari border, folded neatly, soft light.

Photorealistic editorial fashion photograph for a luxury Kerala bridal styling brand. Shot on a medium-format camera, 85mm lens, natural warm window light, soft shadows, warm slightly desaturated colour grade, subtle film grain, ivory, deep burgundy and antique gold palette. Realistic skin texture and realistic hands with five fingers. Sarees must be draped correctly with neat pleats. No text, no captions, no labels, no watermark, no logo, no borders.
```

### 24. `enquiry-bg` — attach `assets-src/previews/enquiry-bg.jpg`

```text
Recreate the attached photo as a sharp, high-resolution, finished photograph in landscape 16:9 aspect ratio. Keep the same subject, pose, styling, colours and mood. Remove the filename caption — the image must contain no text at all.

An ivory and gold silk saree draped over an antique wooden chair beside a sunlit window with fresh jasmine flowers on the seat, no person.

Photorealistic editorial fashion photograph for a luxury Kerala bridal styling brand. Shot on a medium-format camera, 85mm lens, natural warm window light, soft shadows, warm slightly desaturated colour grade, subtle film grain, ivory, deep burgundy and antique gold palette. Realistic skin texture and realistic hands with five fingers. Sarees must be draped correctly with neat pleats. No text, no captions, no labels, no watermark, no logo, no borders.
```

### 25. `insta-01` — attach `assets-src/previews/insta-01.jpg`

```text
Recreate the attached photo as a sharp, high-resolution, finished photograph in square 1:1 aspect ratio. Keep the same subject, pose, styling, colours and mood. Remove the filename caption — the image must contain no text at all.

Back view of a bridal bun decorated with jasmine flowers, gold hair ornament, wearing a gold and maroon silk blouse.

Photorealistic editorial fashion photograph for a luxury Kerala bridal styling brand. Shot on a medium-format camera, 85mm lens, natural warm window light, soft shadows, warm slightly desaturated colour grade, subtle film grain, ivory, deep burgundy and antique gold palette. Realistic skin texture and realistic hands with five fingers. Sarees must be draped correctly with neat pleats. No text, no captions, no labels, no watermark, no logo, no borders.
```

### 26. `insta-02` — attach `assets-src/previews/insta-02.jpg`

```text
Recreate the attached photo as a sharp, high-resolution, finished photograph in square 1:1 aspect ratio. Keep the same subject, pose, styling, colours and mood. Remove the filename caption — the image must contain no text at all.

A pair of gold jhumka earrings with pearls on a small brass plate with white jasmine flowers, warm light, no person.

Photorealistic editorial fashion photograph for a luxury Kerala bridal styling brand. Shot on a medium-format camera, 85mm lens, natural warm window light, soft shadows, warm slightly desaturated colour grade, subtle film grain, ivory, deep burgundy and antique gold palette. Realistic skin texture and realistic hands with five fingers. Sarees must be draped correctly with neat pleats. No text, no captions, no labels, no watermark, no logo, no borders.
```

### 27. `insta-03` — attach `assets-src/previews/insta-03.jpg`

```text
Recreate the attached photo as a sharp, high-resolution, finished photograph in square 1:1 aspect ratio. Keep the same subject, pose, styling, colours and mood. Remove the filename caption — the image must contain no text at all.

Neatly folded ivory Kerala saree with a wide gold kasavu border, close-up still life.

Photorealistic editorial fashion photograph for a luxury Kerala bridal styling brand. Shot on a medium-format camera, 85mm lens, natural warm window light, soft shadows, warm slightly desaturated colour grade, subtle film grain, ivory, deep burgundy and antique gold palette. Realistic skin texture and realistic hands with five fingers. Sarees must be draped correctly with neat pleats. No text, no captions, no labels, no watermark, no logo, no borders.
```

### 28. `insta-04` — attach `assets-src/previews/insta-04.jpg`

```text
Recreate the attached photo as a sharp, high-resolution, finished photograph in square 1:1 aspect ratio. Keep the same subject, pose, styling, colours and mood. Remove the filename caption — the image must contain no text at all.

A woman's hands with gold bangles and a gold ring resting on an ivory and gold silk saree, close-up.

Photorealistic editorial fashion photograph for a luxury Kerala bridal styling brand. Shot on a medium-format camera, 85mm lens, natural warm window light, soft shadows, warm slightly desaturated colour grade, subtle film grain, ivory, deep burgundy and antique gold palette. Realistic skin texture and realistic hands with five fingers. Sarees must be draped correctly with neat pleats. No text, no captions, no labels, no watermark, no logo, no borders.
```

### 29. `insta-05` — attach `assets-src/previews/insta-05.jpg`

```text
Recreate the attached photo as a sharp, high-resolution, finished photograph in square 1:1 aspect ratio. Keep the same subject, pose, styling, colours and mood. Remove the filename caption — the image must contain no text at all.

Close-up of a burgundy silk saree with dense gold woven motifs and a gold border, fabric texture, no person.

Photorealistic editorial fashion photograph for a luxury Kerala bridal styling brand. Shot on a medium-format camera, 85mm lens, natural warm window light, soft shadows, warm slightly desaturated colour grade, subtle film grain, ivory, deep burgundy and antique gold palette. Realistic skin texture and realistic hands with five fingers. Sarees must be draped correctly with neat pleats. No text, no captions, no labels, no watermark, no logo, no borders.
```

### 30. `insta-06` — attach `assets-src/previews/insta-06.png`

```text
Recreate the attached photo as a sharp, high-resolution, finished photograph in square 1:1 aspect ratio. Keep the same subject, pose, styling, colours and mood. Remove the filename caption — the image must contain no text at all.

White jasmine flowers floating in a polished brass bowl (uruli), soft warm light, green leaves in the background.

Photorealistic editorial fashion photograph for a luxury Kerala bridal styling brand. Shot on a medium-format camera, 85mm lens, natural warm window light, soft shadows, warm slightly desaturated colour grade, subtle film grain, ivory, deep burgundy and antique gold palette. Realistic skin texture and realistic hands with five fingers. Sarees must be draped correctly with neat pleats. No text, no captions, no labels, no watermark, no logo, no borders.
```

