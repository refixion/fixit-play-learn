export type Illustration = "driver" | "pick" | "mat" | "shield" | "battery" | "phone" | "suction";
export type Story = { title: string; badge: string; art: Illustration; rule: string; tip: string };
export type Challenge = { title: string; options: string[]; answer: number; explanation: string; art?: Illustration };
export const lessonStories: { stories: Story[]; questions: Challenge[] }[] = [
  {
    stories: [
      { title: "Tiny screw. Perfect fit.", badge: "P2 Pentalobe · 0.8 mm", art: "driver", rule: "P2 fits the exterior pentalobe screws on many iPhones—not every screw inside.", tip: "Keep straight downward pressure. If the bit slips, stop and check the fit." },
      { title: "Plastic is your friend", badge: "Opening pick · Gentle separation", art: "pick", rule: "Use a plastic opening tool around delicate components. Metal can short contacts or puncture a battery.", tip: "Follow the device guide for insertion depth; deeper is not better." },
      { title: "A home for every screw", badge: "Screw mat · Stay organized", art: "mat", rule: "Store each screw in a labeled position. Similar-looking screws can have different lengths.", tip: "Take a photo before removing a shield." },
    ],
    questions: [
      { title: "Match the driver to the screw: exterior pentalobe.", art: "driver", options: ["P2 Pentalobe", "Tri-Point Y000", "Phillips"], answer: 0, explanation: "P2 fits exterior pentalobe screws on many iPhones. Always confirm your model’s guide." },
      { title: "Why avoid metal pry tools near a battery pouch?", options: ["They leave fingerprints", "They can puncture it or short contacts", "They are too light"], answer: 1, explanation: "Conductive, sharp metal can cause a short or damage a Li-ion pouch. Use the specified tool and avoid pressure on the battery." },
      { title: "Where does each removed screw belong?", options: ["In one shared pile", "In any empty screw hole", "In its own labeled position"], answer: 2, explanation: "A labeled mat preserves screw positions and lengths. The wrong screw can damage the board." },
    ],
  },
  {
    stories: [
      { title: "Power down. Start safe.", badge: "Preparation · Power off", art: "phone", rule: "Power off the phone and unplug cables before starting.", tip: "Use a verified model-specific guide for battery preparation and disconnection." },
      { title: "Know when to stop", badge: "Battery · Check for damage", art: "battery", rule: "A swollen or damaged battery is a stop sign. Do not puncture, bend, or heat it.", tip: "Seek trained help rather than trying to flatten a swollen pouch." },
      { title: "Clear space. Clear head.", badge: "Safety · Prepared workspace", art: "shield", rule: "Keep an uncluttered workspace, protect your eyes, and use appropriate ESD precautions.", tip: "Keep metal tools away from battery surfaces and exposed contacts." },
    ],
    questions: [
      { title: "What comes before opening the phone?", options: ["Power off and unplug cables", "Leave it charging", "Turn up the brightness"], answer: 0, explanation: "Power off and unplug first, then follow the guide’s preparation and disconnection sequence." },
      { title: "You find a swollen battery. What now?", options: ["Push it flat", "Stop and seek trained help", "Heat it to soften it"], answer: 1, explanation: "Never puncture, bend, or heat a swollen or damaged battery. Stop the repair." },
      { title: "Which workspace is safest?", options: ["A cluttered metal tray", "A soft bed", "A clear workspace with appropriate ESD protection"], answer: 2, explanation: "A prepared work area reduces lost parts and accidental damage; suitable ESD precautions help protect electronics." },
    ],
  },
  {
    stories: [
      { title: "Meet the inside", badge: "Components · Device diagram", art: "phone", rule: "Locate the display, battery, and main board on your device’s diagram.", tip: "Layouts change between models. Never rely on a generic picture for a repair." },
      { title: "Small cables. Big job.", badge: "Flex cables · Handle gently", art: "phone", rule: "Flex cables connect components and are easily damaged by pulling or folding.", tip: "Check where cables run before lifting a display." },
      { title: "Find the power connection", badge: "Battery connector · Plan first", art: "battery", rule: "Identify the battery connector before planning work on internal components.", tip: "Follow the exact disconnection order in the device guide." },
    ],
    questions: [
      { title: "Which diagram should guide a real repair?", options: ["One for your exact model", "Any phone diagram", "A picture of the case"], answer: 0, explanation: "Component layout, opening direction, and cable routing vary by model." },
      { title: "What can damage a flex cable?", options: ["Looking at it", "Pulling or sharply folding it", "Photographing it"], answer: 1, explanation: "Delicate flex cables can tear or crease. Support connected parts and follow the guide." },
      { title: "What should you locate before planning internal work?", options: ["The wallpaper", "The volume setting", "The battery connector"], answer: 2, explanation: "Locate the battery connector and follow the model-specific preparation and disconnection sequence." },
    ],
  },
  {
    stories: [
      { title: "Warm, not guesswork", badge: "Adhesive · Controlled heat", art: "shield", rule: "Use only the heat method and limits specified for your model. Never heat a damaged battery.", tip: "More heat is not a shortcut to a safer repair." },
      { title: "Lift a little", badge: "Suction handle · Gentle opening", art: "suction", rule: "A suction handle helps create a small opening. Separate adhesive slowly with the specified pick.", tip: "Keep the pick within the guide’s insertion depth." },
      { title: "Support the screen", badge: "Display · Protect flex cables", art: "phone", rule: "Support the lifted display without pulling its attached flex cables.", tip: "Confirm the opening direction before you lift." },
    ],
    questions: [
      { title: "How do you choose a heating method?", options: ["Follow the model-specific guide", "Use the hottest setting", "Heat until it smells"], answer: 0, explanation: "Heating limits and methods are device-dependent. Never apply heat to a damaged battery." },
      { title: "How far should an opening pick go?", options: ["As deep as possible", "Only within the guide’s depth limit", "Until it reaches the battery"], answer: 1, explanation: "Deep insertion can damage cables and components. Follow the model-specific limit." },
      { title: "What should you do with a lifted display?", options: ["Let it hang", "Pull it free", "Support it without stretching the cables"], answer: 2, explanation: "Support the display and follow the opening direction so delicate cables are not pulled." },
    ],
  },
  {
    stories: [
      { title: "Snap before you unscrew", badge: "Shields · Record positions", art: "shield", rule: "Photograph the shield and screw positions before removing them.", tip: "Keep the picture alongside your labeled screw mat." },
      { title: "Match. Don’t force.", badge: "Tri-Point Y000 · Check the head", art: "driver", rule: "Use a driver that matches the screw head; Y000 is not a substitute for P2.", tip: "Stop if the bit slips rather than pushing harder." },
      { title: "Length matters", badge: "Screw mat · Exact positions", art: "mat", rule: "Return every screw to its original position. Never interchange lengths.", tip: "Keep each shield’s screws grouped and labeled." },
    ],
    questions: [
      { title: "What helps record screw positions?", options: ["A photo and labeled mat", "A single mixed pile", "Guessing later"], answer: 0, explanation: "Photographs and labeled storage help keep every screw with its original hole." },
      { title: "The driver slips. What should you do?", options: ["Push harder", "Stop and check the fit", "Switch to a larger random bit"], answer: 1, explanation: "A slipping bit may be a poor match. Forcing it can strip the screw head." },
      { title: "Why must screw lengths stay in order?", options: ["To keep colors matching", "To make the phone heavier", "The wrong length can damage the board"], answer: 2, explanation: "A screw in the wrong position may damage internal layers or components." },
    ],
  },
  {
    stories: [
      { title: "The right tool wins", badge: "Recap · Match your tools", art: "driver", rule: "Choose drivers by screw head and model-specific guidance, not appearance alone.", tip: "A good fit beats extra force." },
      { title: "Safety is a skill", badge: "Recap · Inspect first", art: "battery", rule: "Power off, unplug, and check for battery damage before proceeding.", tip: "Stopping an unsafe repair is a smart decision." },
      { title: "Leave nothing to chance", badge: "Recap · Stay organized", art: "mat", rule: "Use a verified guide and label every screw position.", tip: "This academy builds knowledge; it does not replace a device-specific repair guide." },
    ],
    questions: [
      { title: "Which habit protects screw heads?", options: ["Matching the driver correctly", "Forcing a loose bit", "Using one bit for every screw"], answer: 0, explanation: "Use the driver specified for the screw and stop if it slips." },
      { title: "Which discovery means stop the repair?", options: ["A removable shield", "A swollen or damaged battery", "A labeled screw mat"], answer: 1, explanation: "A damaged battery is hazardous. Do not puncture, bend, or heat it; seek trained help." },
      { title: "What is essential for a real repair?", options: ["Only this quiz", "A generic diagram", "A verified guide for the exact model"], answer: 2, explanation: "Models differ in component layouts, heat limits, cable routing, and screw positions." },
    ],
  },
];