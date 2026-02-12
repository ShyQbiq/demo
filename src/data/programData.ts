export interface ProgramRoom {
  id: number;
  department: string;
  units: number;
  roomType: string;
  roomName: string;
  headcountPerUnit: number;
  netSqfPerUnit: number;
  totalHeadcount: number;
  totalNetSqf: number;
  windowCore: string;
  notes: string;
}

export const PROGRAM_ROOMS: ProgramRoom[] = [
  { id: 1, department: "General", units: 1, roomType: "Comfort Zone > Open Collaboration", roomName: "Closed Collaboration", headcountPerUnit: 12, netSqfPerUnit: 320, totalHeadcount: 12, totalNetSqf: 320, windowCore: "", notes: "" },
  { id: 2, department: "General", units: 1, roomType: "Other", roomName: "Cleaning Room", headcountPerUnit: 1, netSqfPerUnit: 60, totalHeadcount: 1, totalNetSqf: 60, windowCore: "", notes: "" },
  { id: 3, department: "General", units: 1, roomType: "Other > Game Room", roomName: "Game Room", headcountPerUnit: 5, netSqfPerUnit: 215, totalHeadcount: 5, totalNetSqf: 215, windowCore: "", notes: "" },
  { id: 4, department: "General", units: 2, roomType: "IT Room > IT Room", roomName: "IT", headcountPerUnit: 1, netSqfPerUnit: 60, totalHeadcount: 2, totalNetSqf: 120, windowCore: "", notes: "" },
  { id: 5, department: "General", units: 2, roomType: "Other > Multi", roomName: "Multipurpose", headcountPerUnit: 1, netSqfPerUnit: 860, totalHeadcount: 2, totalNetSqf: 1721, windowCore: "", notes: "" },
  { id: 6, department: "General", units: 1, roomType: "Other > Training", roomName: "Training", headcountPerUnit: 24, netSqfPerUnit: 480, totalHeadcount: 24, totalNetSqf: 480, windowCore: "", notes: "" },
  { id: 7, department: "General", units: 3, roomType: "Other > Video Conf", roomName: "Videoconf", headcountPerUnit: 5, netSqfPerUnit: 120, totalHeadcount: 15, totalNetSqf: 360, windowCore: "", notes: "" },
  { id: 8, department: "General", units: 1, roomType: "Kitchen", roomName: "Kitchen", headcountPerUnit: 4, netSqfPerUnit: 160, totalHeadcount: 4, totalNetSqf: 160, windowCore: "", notes: "" },
  { id: 9, department: "General", units: 1, roomType: "Kitchen > Employee Lounge", roomName: "Employee Lounge", headcountPerUnit: 1, netSqfPerUnit: 500, totalHeadcount: 1, totalNetSqf: 500, windowCore: "", notes: "" },
  { id: 10, department: "General", units: 3, roomType: "Print Hub", roomName: "Print Hub", headcountPerUnit: 1, netSqfPerUnit: 60, totalHeadcount: 3, totalNetSqf: 180, windowCore: "", notes: "" },
  { id: 11, department: "General", units: 1, roomType: "Reception", roomName: "Reception", headcountPerUnit: 2, netSqfPerUnit: 400, totalHeadcount: 2, totalNetSqf: 400, windowCore: "", notes: "" },
  { id: 12, department: "General", units: 1, roomType: "Other > Wellness Room", roomName: "Wellness Room", headcountPerUnit: 1, netSqfPerUnit: 160, totalHeadcount: 1, totalNetSqf: 160, windowCore: "", notes: "" },
  { id: 13, department: "General", units: 91, roomType: "Open Space WS > Benching 150x75", roomName: "Benching 150x75", headcountPerUnit: 1, netSqfPerUnit: 40, totalHeadcount: 91, totalNetSqf: 3641, windowCore: "Window", notes: "Window desirable" },
  { id: 14, department: "General", units: 2, roomType: "Conference", roomName: "Conference L", headcountPerUnit: 16, netSqfPerUnit: 320, totalHeadcount: 32, totalNetSqf: 640, windowCore: "", notes: "" },
  { id: 15, department: "General", units: 2, roomType: "Conference", roomName: "Conference M", headcountPerUnit: 10, netSqfPerUnit: 200, totalHeadcount: 20, totalNetSqf: 400, windowCore: "", notes: "" },
  { id: 16, department: "General", units: 2, roomType: "Conference", roomName: "Conference S", headcountPerUnit: 4, netSqfPerUnit: 80, totalHeadcount: 8, totalNetSqf: 160, windowCore: "", notes: "" },
  { id: 17, department: "General", units: 1, roomType: "Conference", roomName: "Conference XL", headcountPerUnit: 20, netSqfPerUnit: 400, totalHeadcount: 20, totalNetSqf: 400, windowCore: "", notes: "" },
  { id: 18, department: "General", units: 2, roomType: "Office – Non-Receiving", roomName: "Focus Room", headcountPerUnit: 1, netSqfPerUnit: 30, totalHeadcount: 2, totalNetSqf: 60, windowCore: "", notes: "" },
  { id: 19, department: "General", units: 56, roomType: "Other", roomName: "Lockers", headcountPerUnit: 1, netSqfPerUnit: 10, totalHeadcount: 56, totalNetSqf: 560, windowCore: "", notes: "" },
  { id: 20, department: "General", units: 18, roomType: "Office – Receiving Guests", roomName: "Office M", headcountPerUnit: 1, netSqfPerUnit: 140, totalHeadcount: 18, totalNetSqf: 2521, windowCore: "Window", notes: "Window desirable" },
  { id: 21, department: "General", units: 1, roomType: "Executive Office", roomName: "Office XL", headcountPerUnit: 1, netSqfPerUnit: 270, totalHeadcount: 1, totalNetSqf: 270, windowCore: "Window", notes: "Window desirable" },
  { id: 22, department: "General", units: 4, roomType: "Phone Booth > Module", roomName: "Phone Booth", headcountPerUnit: 1, netSqfPerUnit: 30, totalHeadcount: 4, totalNetSqf: 120, windowCore: "", notes: "" },
  { id: 23, department: "General", units: 1, roomType: "Storage Room > Storage", roomName: "Storage", headcountPerUnit: 1, netSqfPerUnit: 60, totalHeadcount: 1, totalNetSqf: 60, windowCore: "", notes: "" },
  { id: 24, department: "General", units: 1, roomType: "Comfort Zone > Lounge", roomName: "Comfort L", headcountPerUnit: 1, netSqfPerUnit: 260, totalHeadcount: 1, totalNetSqf: 260, windowCore: "", notes: "" },
  { id: 25, department: "General", units: 11, roomType: "Comfort Zone > Lounge", roomName: "Comfort S", headcountPerUnit: 1, netSqfPerUnit: 60, totalHeadcount: 11, totalNetSqf: 660, windowCore: "", notes: "" },
];

export const PROGRAM_SUMMARY = {
  allFloorsNetSqf: 23_145,
  currentProgramNetSqf: 14_430,
  buildingNetSqf: 15_050,
  programHeadcount: 114,
  assignedSpacePct: 96,
};
