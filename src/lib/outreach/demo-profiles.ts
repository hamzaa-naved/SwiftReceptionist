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

const BUAC_ELECTRIC: DemoProfile = {
  city: "Holiday, Florida",
  services: "residential, commercial, and industrial electrical service, electrical panels and service upgrades, EV charging, lighting, solar electrical work, HVAC electrical, and automation and control systems",
  qualificationFocus: "Screen immediate electrical danger first. Then ask one short question at a time to understand whether the work is residential, commercial, or industrial; what is needed; the service address; the best callback number; and useful timing. For EV charging ask about the vehicle or charger and installation location. For panels, solar, HVAC electrical, or automation and controls, ask what prompted the request and the project stage. BUAC advertises same-day response, but do not promise availability, pricing, arrival times, or a booked appointment.",
  testScenarios: "A homeowner needs an electrical panel upgrade; a business needs automation and control work; a customer wants an EV charger; a caller asks about same-day service; an industrial customer needs electrical troubleshooting.",
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
  if (normalizedBusiness === "buac electric") return BUAC_ELECTRIC;
  return DEFAULT;
}
