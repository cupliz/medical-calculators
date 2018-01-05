export const config = {
  "id": "nih-stroke-score",
  "title": "NIH Stroke Score",
  "type": "points",
  "points": 0,
  "questions": [
    {
      "group": "1A: Level of Consciousness",
      "data": {
        "type": "radio",
        "options":
          "Alert | Not alert, but arousable by minor stimulation | Not alert, requires repeated stimulation to attend | Coma",
        "points": "0/1/2/3"
      }
    },
    {
      "group": "1B: Ask Patient the Month and His/Her Age",
      "data": {
        "type": "radio",
        "options":
          "Answers both questions correctly | Answers one question correctly | Neither correct",
        "points": "0/1/2"
      }
    },
    {
      "group":
        "1C: Open and Close Eyes on Command/Grip and release non-paretic hand ",
      "data": {
        "type": "radio",
        "options":
          "Obeys both correctly | Obeys one correctly | Both incorrect",
        "points": "0/1/2"
      }
    },
    {
      "group": "2: Best Gaze (only horizontal eye movement)",
      "data": {
        "type": "radio",
        "options": "Normal | Partial gaze palsy | Forced deviation",
        "points": "0/1/2"
      }
    },
    {
      "group": "3: Visual Field testing",
      "data": {
        "type": "radio",
        "options":
          "No visual field loss | Partial hemianopia | Complete hemianopia | Bilateral hemianopia or Patient is bilaterally blind",
        "points": "0/1/2/3"
      }
    },
    {
      "group":
        "4: Facial Palsy (Ask patient to show teeth or raise eyebrows and close eye)",
      "data": {
        "type": "radio",
        "options":
          "Normal symmetrical movement | Minor paralysis | Partial paralysis (total or near total paralysis of lower face) | Complete paralysis of one or both sides",
        "points": "0/1/2/3"
      }
    },
    {
      "group":
        "5A: Motor Function of Right Arm (Count out loud and use your fingers to show patient your count)",
      "data": {
        "type": "radio",
        "options":
          "No drift for 10 sec | Drift limb holds 90 (or 45 deg) but drifts down before full 10 sec | Some effort against gravity | No effort against gravity | No movement | Amputation or joint fusion",
        "points": "0/1/2/3/4/0"
      }
    },
    {
      "group":
        "5B: Motor Function of Left Arm (Count out loud and use your fingers to show patient your count)",
      "data": {
        "type": "radio",
        "options":
          "No drift for 10 sec | Drift limb holds 90 (or 45 deg) but drifts down before full 10 sec | Some effort against gravity | No effort against gravity | No movement | Amputation or joint fusion",
        "points": "0/1/2/3/4/0"
      }
    },
    {
      "group":
        "6A: Motor Function of Right Leg (Hold the leg at 30 deg, always tested in supine position)",
      "data": {
        "type": "radio",
        "options":
          "No drift for 5 sec | Drift, leg falls by end of 5 sec | Some effort against gravity | No effort against gravity, leg falls to bed immediately | No movement | Amputation or joint fusion",
        "points": "0/1/2/3/4/0"
      }
    },
    {
      "group":
        "6B: Motor Function of Left Leg (Hold the leg at 30 deg, always tested in supine position)",
      "data": {
        "type": "radio",
        "options":
          "No drift for 5 sec | Drift, leg falls by end of 5 sec | Some effort against gravity | No effort against gravity, leg falls to bed immediately | No movement | Amputation or joint fusion",
        "points": "0/1/2/3/4/0"
      }
    },
    {
      "group": "7: Limb Ataxia (Test with eyes open)",
      "data": {
        "type": "radio",
        "options":
          "None | Present in 1 limb | Present in 2 limbs | Amputation or joint fusion",
        "points": "0/1/2/0"
      }
    },
    {
      "group": "8: Sensory by Pinprick",
      "data": {
        "type": "radio",
        "options":
          "Normal | Mild to moderate sensory loss | Severe or total sensory loss",
        "points": "0/1/2"
      }
    },
    {
      "group":
        "9: Best Language (Describe a picture, name items, read sentences)",
      "data": {
        "type": "radio",
        "options":
          "No aphasia | Mild - Moderate aphasia | Severe aphasia | Mute",
        "points": "0/1/2/3"
      }
    },
    {
      "group": "10: Dysarthria (read or repeat words)",
      "data": {
        "type": "radio",
        "options":
          "Normal | Mild to Moderate slurring | Severe dysarthria | Intubated or other physical impediment to testing",
        "points": "0/1/2/0"
      }
    },
    {
      "group": "11: Extinction and Inattention (Neglect)",
      "data": {
        "type": "radio",
        "options":
          "No abnormality | Visual, tactile, auditory, spatial or personal inattention or extinction to bilateral simultaneous stimulation in one of the sensory modalities | Severe hemi-inattention or extinction to more than one modality",
        "points": "0/1/2"
      }
    }
  ],
  "results": {},
  "notes": {
    "type": "unordered-list",
    "content": [
      "The NIH Stroke Score is used to quantify patient stroke severity and to track outcomes, improvement or deteoriation of a stroke",
      "If the patient has a prior known neurological deficit (e.g. Blindness, Quadriplegia, Language barriers etc.), it becomes even more complicated to evaluate. Refer to the NIH Stroke Scale Website for more details.",
      "Scores > 22 are considered very significant and may predict increased complication risk.",
      "If the patient's arm or leg cannot be tested due to amputation or other limitation such as joint fusion, untestable is recorded and no points are counted."
    ]
  },
  "references": {
    "type": "ordered-list",
    "content": [
      "Brott T, Adams HP Jr, Olinger CP, et. al. Measurements of acute cerebral infarction: a clinical examination scale. Stroke. 1989 Jul;20(7):864-70.",
      "NIH Stroke Scale https://stroke.nih.gov/resources/scale.htm"
    ]
  }
}
