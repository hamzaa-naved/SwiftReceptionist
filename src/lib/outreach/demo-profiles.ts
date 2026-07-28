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

const KINGDOM_ELECTRIC: DemoProfile = {
  city: "Naples, Florida",
  services: "residential electrical repairs, maintenance and design, commercial maintenance, repairs, upgrades and electrical design, new construction and renovation electrical systems, and custom outdoor-lighting design and installation",
  qualificationFocus: "Screen immediate electrical danger first. Ask whether the work is residential or commercial, what is happening or being planned, the service address, callback number, name, and useful timing. For construction ask project type and stage. For outdoor lighting ask whether it is repair, replacement, or a new design. Do not diagnose, invent pricing, promise arrival times, or claim a real appointment is booked.",
  testScenarios: "A homeowner has flickering lights; a business needs an electrical-layout upgrade; a contractor needs wiring for a new build; a homeowner wants custom outdoor lighting; a caller asks about a free consultation.",
};

const DIAL_ONE_ELECTRICAL: DemoProfile = {
  city: "Austin, Texas and surrounding areas",
  services: "home electrical installations, electrical repairs, commercial electrical service, inspections, 24-hour emergency electrical service, outdoor and parking-lot lighting, wiring and rewiring, EV charger installation, generators and transfer switches, panels, fixtures, outlets, and modern electrical upgrades",
  qualificationFocus: "Screen immediate electrical danger first. Ask whether the work is residential or commercial, what is happening, the service address, callback number, name, and useful timing. For EV chargers ask the vehicle or charger, parking location, and plug-in versus hardwired preference. For generators ask whether the request is for a generator, transfer switch, repair, or new installation. Do not diagnose, invent pricing, promise arrival times, or claim a real appointment is booked.",
  testScenarios: "A caller has a hot buzzing panel; a homeowner wants an EV charger; a business needs parking-lot lighting; a caller asks about the first-time discount; a customer needs emergency service after hours.",
};

const MORRISON_ELECTRIC: DemoProfile = {
  city: "Augusta and the CSRA, Georgia",
  services: "24-hour emergency electrical service and repair, troubleshooting, new construction and remodel electrical work, service changes and upgrades, whole-house surge protection, circuit breakers and panels, interior and outdoor lighting design, wiring repair, generators, ceiling fans, outlets and switches, wired smoke and carbon-monoxide detector installation and maintenance, solar-related work, and EV charging",
  qualificationFocus: "Screen immediate electrical danger first. Ask what is happening or being planned, the service address, callback number, name, and timing. For construction ask project type and stage. For lighting ask whether repair, replacement, interior design, or outdoor landscape lighting. For EV charging ask vehicle or charger, parking location, and plug-in versus hardwired. Do not diagnose, invent pricing, promise arrival times, or claim a real appointment is booked.",
  testScenarios: "A caller smells burning near the panel; a homeowner needs a remodel; a customer wants outdoor lighting; a homeowner wants an EV charger; a caller asks about a free quote.",
};

const NORTH_SPRINGS_ELECTRIC: DemoProfile = {
  city: "Sandy Springs and Metro Atlanta, Georgia",
  services: "residential, commercial, warehouse, and industrial electrical service; troubleshooting and repairs; electrical inspections and outlet testing; circuit breakers; panel upgrades and replacements; service replacements; new outlets, circuits, and 240-volt circuits; EV chargers; generator connections; lighting systems; dedicated circuits; home-purchase inspections; and commercial electrical improvements",
  qualificationFocus: "Screen immediate electrical danger first. Ask what is happening or being planned, whether the property is residential, commercial, warehouse, or managed property, the service address, callback number, name, and useful timing. For panels ask what prompted the request and whether the caller knows the current service size. For EV charging ask the vehicle or charger, parking location, and plug-in versus hardwired preference. For generator connections ask the equipment and whether it is new installation or modification. Do not diagnose, invent pricing, promise arrival times, or claim a real appointment is booked.",
  testScenarios: "A homeowner has a breaker that keeps tripping; a customer needs a panel upgrade; a driver wants an EV charger; a property manager needs recurring electrical work; a business needs a dedicated 240-volt circuit; a caller asks about the $99 Basic Service.",
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
  if (normalizedBusiness === "kingdom electric inc") return KINGDOM_ELECTRIC;
  if (normalizedBusiness === "dial one electrical services") return DIAL_ONE_ELECTRICAL;
  if (normalizedBusiness === "morrison electric") return MORRISON_ELECTRIC;
  if (normalizedBusiness === "north springs electric") return NORTH_SPRINGS_ELECTRIC;
  return DEFAULT;
}
