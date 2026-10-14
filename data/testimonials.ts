export type Testimonial = { quote: string; name: string; role: string; project: string; rating: number };

/** Replace with real client quotes before launch. */
export const testimonials: Testimonial[] = [
  { quote: "They measured the room before they quoted anything. The control room translates — mixes finally hold up in the car.", name: "Arjun R.", role: "Producer & mix engineer", project: "Recording studio, Bengaluru", rating: 5 },
  { quote: "Four hosts, two cameras, one button to go live. Our marketing team runs the podcast studio without any help from us.", name: "Priya S.", role: "Head of IT", project: "Corporate podcast studio", rating: 5 },
  { quote: "The 600-seat hall used to have dead spots at the back. Now the last row hears the speaker as clearly as the first.", name: "Dr. Mahesh K.", role: "Principal", project: "College auditorium", rating: 5 },
  { quote: "Quoted the same day, gear arrived in two days, and they followed up to check the setup. That is rare for pro audio in India.", name: "Nikhil D.", role: "Live-sound engineer", project: "PA and wireless purchase", rating: 5 },
  { quote: "Our theatre looks like part of the house and sounds like a cinema. Calibration made more difference than the speakers did.", name: "Rhea & Karan M.", role: "Homeowners", project: "Dedicated home theatre", rating: 5 },
  { quote: "Honest advice. They talked me out of a more expensive interface because my room needed treatment first.", name: "Sahil V.", role: "Independent artist", project: "Home studio", rating: 5 },
];
