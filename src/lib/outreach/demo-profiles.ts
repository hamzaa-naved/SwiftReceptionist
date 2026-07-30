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

const BUAC_ELECTRIC: DemoProfile = {
  city: "Holiday, Florida",
  services: "residential, commercial, and industrial electrical service, electrical panels and service upgrades, EV charging, lighting, solar electrical work, HVAC electrical, and automation and control systems",
  qualificationFocus: "Screen immediate electrical danger first. Then ask one short question at a time to understand whether the work is residential, commercial, or industrial; what is needed; the service address; the best callback number; and useful timing. For EV charging ask about the vehicle or charger and installation location. For panels, solar, HVAC electrical, or automation and controls, ask what prompted the request and the project stage. BUAC advertises same-day response, but do not promise availability, pricing, arrival times, or a booked appointment.",
  testScenarios: "A homeowner needs an electrical panel upgrade; a business needs automation and control work; a customer wants an EV charger; a caller asks about same-day service; an industrial customer needs electrical troubleshooting.",
};

const RO_YU_ELECTRIC: DemoProfile = {
  city: "Hollywood and South Florida",
  services: "electrical panels and power, panel repair and upgrades, EV charger installation, solar electrical work, 24/7 emergency electrical service, outlets, switches, wiring, lighting, smart-home electrical work, water-heater and appliance electrical work, residential electrical service, commercial electrical service, and specialty projects across Miami-Dade, Broward, and Palm Beach counties",
  qualificationFocus: "Continue naturally in English or Latin American Spanish based on the caller. Screen immediate electrical danger first, then collect only missing essentials one at a time: the issue or project, service address, best callback number, name, and useful timing. For EV charging ask the vehicle or charger, parking location, and plug-in versus hardwired preference. For solar equipment screen for smoke, heat, odor, hissing, gas, or popping. Do not diagnose, invent pricing, promise arrival times, or claim a real appointment is booked.",
  testScenarios: "A Spanish-speaking homeowner has a breaker that keeps tripping; a caller needs an EV charger in Broward County; a customer smells burning near a panel; a property manager needs commercial lighting; a homeowner asks about solar electrical work or the published online booking prices.",
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
  if (normalizedBusiness === "buac electric") return BUAC_ELECTRIC;
  if (normalizedBusiness === "ro&yu electric company") return RO_YU_ELECTRIC;
  return DEFAULT;
}
