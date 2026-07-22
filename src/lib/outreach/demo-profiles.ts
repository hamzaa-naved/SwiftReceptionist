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

const DEFAULT: DemoProfile = {
  city: "",
  services: "electrical troubleshooting, repairs, wiring, lighting, and panel work",
  qualificationFocus: "Ask what is happening, how urgent it is, the service address, and the best callback number. Do not quote prices or promise an appointment.",
  testScenarios: "A breaker will not reset; a customer needs electrical troubleshooting; a homeowner wants an upgrade.",
};

export function getDemoProfile(business: string): DemoProfile {
  return business.trim().toLowerCase() === "dikort electric" ? DIKORT : DEFAULT;
}
