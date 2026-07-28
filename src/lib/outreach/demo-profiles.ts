type DemoProfile = {
  city: string;
  services: string;
  qualificationFocus: string;
  testScenarios: string;
};

const DIKORT: DemoProfile = {
  city: "Port St. Lucie, Florida",
  services: "electrical troubleshooting and repairs, faulty breakers, residential wiring and rewiring, custom indoor and outdoor lighting, panel replacements and upgrades, landscape lighting, and whole-home surge protection for residential and commercial customers",
  qualificationFocus: "Ask whether the caller needs residential or commercial work, what is happening, how urgent it is, their service address, and the best callback number. Do not quote prices, promise an arrival time, or claim a real appointment is booked.",
  testScenarios: "A breaker will not reset; a homeowner needs a panel upgrade; a customer wants landscape lighting; a commercial customer needs a lighting installation.",
};

const NEIGHBORS_ELECTRIC: DemoProfile = {
  city: "Dallas–Fort Worth, Texas",
  services: "electrical panel upgrades, EV charger installation, whole-home generator installation, ceiling fans, light fixtures, outlets, wiring and rewiring, circuit breakers, light switches, electrical troubleshooting, 24-hour emergency electrical service, and commercial electrical service",
  qualificationFocus: "Ask what is happening, screen immediate electrical danger first, then collect only missing essentials one at a time: service address, best callback number, name, and timing if useful. For EV chargers ask the vehicle or charger, parking location, and plug-in versus hardwired preference. For generators ask whether it is running and where. Do not diagnose, invent pricing, promise arrival times, or claim a real appointment is booked.",
  testScenarios: "A panel is hot and buzzing; a homeowner wants a Level 2 EV charger; a caller asks about the UPGRADE15 promotion; a property manager needs commercial lighting work; a homeowner asks about the Neighbor’s Plan.",
};

const DEFAULT: DemoProfile = {
  city: "",
  services: "electrical troubleshooting, repairs, wiring, lighting, and panel work",
  qualificationFocus: "Ask what is happening, how urgent it is, the service address, and the best callback number. Do not quote prices or promise an appointment.",
  testScenarios: "A breaker will not reset; a customer needs electrical troubleshooting; a homeowner wants an upgrade.",
};

export function getDemoProfile(business: string): DemoProfile {
  const normalizedBusiness = business.trim().toLowerCase();
  if (normalizedBusiness === "dikort electric") return DIKORT;
  if (normalizedBusiness === "neighbors electric") return NEIGHBORS_ELECTRIC;
  return DEFAULT;
}
