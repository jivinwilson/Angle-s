# Angel's — AI Image Prompt Set

Every image is **illustrative campaign imagery**: never presented as real Angel's clients. Each id below is also the image's id in `content/assets.ts` and its file name.

## Shared style (append to every prompt)

> Photorealistic editorial fashion photograph, shot on medium-format camera, 85mm lens, natural warm window light, soft shadows, warm slightly desaturated colour grade, subtle film grain, ivory and burgundy palette with gold accents, elegant and calm, luxury Indian bridal campaign, high detail fabric texture, realistic hands, no text, no watermark, no logo.

## Negative prompt (where supported)

> Extra fingers, distorted hands, plastic skin, heavy retouching, glitter, oversaturated red, cluttered background, text, watermark, logo, cartoon, illustration, western wedding dress, sari worn incorrectly, mismatched pleats.

## Model guidance

- Adult South Indian women with natural skin tones and realistic features.
- Generic, non-identifiable faces.
- Many shots are cropped to focus on fabric, hands and jewellery.

---

## Hero

| id | Ratio | Prompt |
|---|---|---|
| `hero-desktop` | 3:2 | A Kerala bride in an ivory Kanjeevaram silk saree with a broad gold zari border, pallu flowing off one shoulder in mid-motion, standing in front of a plain deep burgundy backdrop, three-quarter view, eyes looking down softly, traditional gold temple jewellery, jasmine in hair, generous negative space on the left for text |
| `hero-mobile` | 4:5 | Same subject and styling as hero-desktop, vertical composition, subject centred lower in frame, pallu sweeping across the top third |
| `hero-silk-poster` | 16:9 | Close-up abstract of deep burgundy silk fabric with gentle flowing folds and a soft gold sheen, no person, used as a background texture |

## Home sections

| id | Ratio | Prompt |
|---|---|---|
| `intro-pleats` | 4:5 | Close-up of a stylist's hands arranging perfectly even saree pleats on an ivory and gold Kerala kasavu saree, shallow depth of field, warm light |
| `artistry-consult` | 4:5 | A stylist and a bride seated together looking at folded silk sarees on a teak table, soft daylight, ivory walls, faces partly turned away |
| `artistry-drape` | 4:5 | Stylist's hands pinning the pallu of a red-and-gold Kanjeevaram saree at a bride's shoulder, close crop, focus on hands and fabric |
| `artistry-reveal` | 4:5 | Bride in finished red-and-gold Kanjeevaram saree turning toward a tall window, back three-quarter view, light on the pallu |
| `bridal-feature` | 4:5 | Full-length editorial portrait of a South Indian bride in a deep red Kanjeevaram silk saree with gold zari, standing in a Kerala tharavadu wooden doorway, calm expression |
| `occasions-feature` | 4:5 | Woman in an elegant burgundy silk saree at an evening reception, warm ambient lights softly blurred in background, poised posture |
| `why-detail` | 1:1 | Macro of a Kerala kasavu saree gold border and ivory cotton weave, folded neatly |
| `enquiry-bg` | 3:2 | Softly lit ivory saree pallu draped over a teak chair beside a window with jasmine flowers on the seat |

## Services

| id | Ratio | Prompt |
|---|---|---|
| `svc-bridal-saree-draping` | 4:5 | Bride in a richly draped silk bridal saree, close mid-shot on the shoulder pleats and pallu, gold jewellery |
| `svc-kanjeevaram-bridal` | 4:5 | Bride in a magenta and gold Kanjeevaram silk saree with temple motif border, neat front pleats, standing near brass lamp |
| `svc-kerala-kasavu` | 4:5 | Woman in a traditional ivory Kerala kasavu saree with gold border, jasmine in hair, standing by a wooden pillar in soft daylight |
| `svc-christian-bridal` | 4:5 | Kerala Christian bride in an ivory and gold silk saree with a soft white tulle veil, delicate pearl jewellery, light from a tall church window |
| `svc-hindu-bridal` | 4:5 | Kerala Hindu bride in a red and gold silk saree, layered traditional gold necklaces, jasmine strands, warm lamp light |
| `svc-muslim-bridal` | 4:5 | Kerala Muslim bride in a maroon and gold silk saree with an elegantly draped matching dupatta over the head, soft smile, warm light |
| `svc-reception` | 4:5 | Woman in a contemporary deep burgundy silk saree with fine gold border, evening reception setting, softly blurred lights |
| `svc-wedding-guest` | 4:5 | Woman in a pastel peach organza silk saree at a daytime wedding, garden backdrop softly blurred |
| `svc-special-occasion` | 4:5 | Woman in a cream silk saree with a muted gold border attending a church function, graceful posture, soft daylight |
| `svc-group-draping` | 3:2 | Three women in coordinated rose-gold silk sarees standing together, backs and side profiles visible, pallus aligned |
| `svc-lehenga-dupatta` | 4:5 | Bride in an ivory and gold lehenga with a sheer dupatta being set neatly over one shoulder, close mid-shot |
| `svc-pre-pleating` | 1:1 | Overhead flat lay of a neatly pre-pleated and box-folded red silk saree on ivory linen, pins and tissue paper beside it, no person |
| `svc-bridal-makeup` | 4:5 | Close-up of a makeup artist applying soft gold eyeshadow to a bride with natural skin, eyes closed, warm light |
| `svc-hair-styling` | 4:5 | Back view of a bride's low bun decorated with jasmine strands and a gold hair ornament |
| `svc-custom-styling` | 1:1 | Overhead of silk saree swatches in burgundy, ivory, gold and magenta fanned out on a teak table with gold jewellery |

## Lookbook (extra)

| id | Ratio | Prompt |
|---|---|---|
| `lb-pallu-motion` | 4:5 | Gold zari pallu caught mid-air in motion against a burgundy backdrop, bride's hand visible |
| `lb-zari-macro` | 1:1 | Extreme macro of Kanjeevaram gold zari temple motif weaving |
| `lb-jasmine-detail` | 1:1 | Close-up of jasmine strands against an ivory silk saree shoulder |
| `lb-jewellery-pleats` | 4:5 | Close-up of a bride's waist with gold waist belt (oddiyanam) over neat red silk pleats |
| `lb-window-portrait` | 4:5 | Bride in ivory kasavu saree seated by a wooden window, looking outside, soft backlight |
| `lb-church-steps` | 3:2 | Christian bride in white and gold saree walking on stone steps, veil trailing, seen from behind |

## Instagram tiles

Use six square crops from the lookbook and service images. No separate generation is needed.

## Open Graph

| id | Ratio | Prompt |
|---|---|---|
| `og-default` | 1.91:1 | hero-desktop composition with extra negative space on the right for the wordmark overlay |

---

## Replacement plan

When Angel's has its own photoshoot, each id gets a matching real shot, ideally with the same framing and ratio.

1. Mark the image's type as `portfolio` in `content/assets.ts`.
2. The "Our Brides" gallery section unlocks automatically.
