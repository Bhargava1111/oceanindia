/**
 * Project gallery entries. Add `image: "/projects/<file>.jpg"` once you upload photos to /public/projects;
 * until then each tile renders a labelled image slot.
 */
export type Project = {
  slug: string;
  title: string;
  type: "Studio" | "Podcast" | "Auditorium" | "Conference" | "Classroom" | "Home theatre" | "Venue" | "Acoustics";
  city: string;
  year: number;
  summary: string;
  scope: string[];
  hue: number;
  aspect: string;
  image?: string;
};

export const projects: Project[] = [
  { slug: "indiranagar-control-room", image: "/images/projects/indiranagar-control-room.webp", title: "Control room & live room", type: "Studio", city: "Bengaluru", year: 2026, summary: "A 220 sq ft control room with ADAM midfields, treated to a 0.25 s RT60, plus a drum-ready live room with variable acoustics.", scope: ["Acoustic design", "Monitoring", "Patching", "Calibration"], hue: 190, aspect: "aspect-[4/3]" },
  { slug: "college-auditorium-600", image: "/images/projects/college-auditorium-600.webp", title: "600-seat auditorium refit", type: "Auditorium", city: "Mysuru", year: 2025, summary: "Line-array PA, digital console, 16-channel wireless and a 6 m LED wall for a college that hosts fests and convocations.", scope: ["Coverage modelling", "PA & DSP", "LED wall", "Training"], hue: 260, aspect: "aspect-[3/4]" },
  { slug: "koramangala-podcast", image: "/images/projects/koramangala-podcast.webp", title: "Four-host video podcast suite", type: "Podcast", city: "Bengaluru", year: 2026, summary: "Broadcast mics, podcast console, three PTZ cameras and one-touch streaming for a media start-up’s weekly shows.", scope: ["Treatment", "Audio chain", "Cameras & lighting", "Streaming"], hue: 170, aspect: "aspect-[4/3]" },
  { slug: "whitefield-private-theatre", image: "/images/projects/whitefield-private-theatre.webp", title: "Private 7.2.4 theatre", type: "Home theatre", city: "Bengaluru", year: 2025, summary: "A dedicated 14-seat theatre with 4K laser projection, in-wall Atmos speakers and fabric-wrapped treatment matched to the interiors.", scope: ["Layout", "Projection", "Atmos", "Calibration"], hue: 300, aspect: "aspect-[3/4]" },
  { slug: "atmos-mix-room", image: "/images/projects/atmos-mix-room.webp", title: "7.1.4 Dolby Atmos mix room", type: "Studio", city: "Hyderabad", year: 2025, summary: "A film-post mix room built to Dolby guidelines with matched monitors, bass management and renderer integration.", scope: ["Dolby-aligned design", "Monitor array", "Renderer & I/O", "Verification"], hue: 220, aspect: "aspect-[4/3]" },
  { slug: "tech-park-boardroom", image: "/images/projects/tech-park-boardroom.webp", title: "Boardroom & six huddle rooms", type: "Conference", city: "Bengaluru", year: 2024, summary: "Ceiling-mic arrays, beam-steering speakers and certified Teams rooms across a floor — one touch to join, no IT tickets.", scope: ["Speech acoustics", "Mics & speakers", "Video conferencing", "Control"], hue: 200, aspect: "aspect-[4/3]" },
  { slug: "school-smart-classrooms", image: "/images/projects/school-smart-classrooms.webp", title: "40 smart classrooms", type: "Classroom", city: "Chennai", year: 2024, summary: "Interactive panels, voice-lift audio and lecture capture rolled out across a school campus in six weeks.", scope: ["Interactive panels", "Voice lift", "Lecture capture", "Teacher training"], hue: 150, aspect: "aspect-[3/4]" },
  { slug: "rooftop-resto-bar", image: "/images/projects/rooftop-resto-bar.webp", title: "Rooftop resto-bar", type: "Venue", city: "Bengaluru", year: 2025, summary: "Zoned loudspeakers, a DJ booth and noise containment that keeps the dance floor loud and the neighbours quiet.", scope: ["Zoning", "DJ booth", "Lighting", "Noise compliance"], hue: 320, aspect: "aspect-[4/3]" },
  { slug: "open-office-acoustics", image: "/images/projects/open-office-acoustics.webp", title: "Open-office acoustic retrofit", type: "Acoustics", city: "Pune", year: 2024, summary: "Measured, designed and installed ceiling baffles and wall absorbers that cut reverberation by 60% without touching the interiors.", scope: ["Measurement", "Treatment design", "Fabrication", "Verification"], hue: 180, aspect: "aspect-[4/3]" },
  { slug: "boutique-gym", image: "/images/projects/boutique-gym.webp", title: "Boutique fitness studio", type: "Venue", city: "Bengaluru", year: 2026, summary: "High-output zones for the floor and spin room, instructor headsets and a single wall panel for staff.", scope: ["Loudspeaker zones", "Instructor wireless", "Zone control"], hue: 140, aspect: "aspect-[3/4]" },
  { slug: "university-lecture-hall", image: "/images/projects/university-lecture-hall.webp", title: "300-seat lecture hall", type: "Auditorium", city: "Kochi", year: 2023, summary: "Distributed speech reinforcement, dual projection and lecture capture for a hall used from 8 a.m. to 8 p.m.", scope: ["Speech system", "Projection", "Capture", "Training"], hue: 240, aspect: "aspect-[4/3]" },
  { slug: "home-studio-makeover", image: "/images/projects/home-studio-makeover.webp", title: "Bedroom studio makeover", type: "Studio", city: "Bengaluru", year: 2026, summary: "A 10×12 ft bedroom turned into a mixing room: bass traps, first-reflection panels, monitor placement and calibration under ₹1.5 lakh.", scope: ["Treatment", "Monitor setup", "Calibration"], hue: 205, aspect: "aspect-[4/3]" },
];

export const projectTypes = Array.from(new Set(projects.map((p) => p.type)));
