// export interface IrefTos {
//   byId: { [key: string]: IrefTo };
//   allIds: string[];
// }

export interface IrefTo {
  // id: string;
  refTo_eId: string;
}

// export interface Icomponents {
//   byId: { [key: string]: Icomponent };
//   allIds: string[];
// }

export interface Icomponent {
  // id: string;
  eId: string;
  componentNum: number;
  // refTo: IrefTo[];
}
// export interface Ilaws {
//   byId: { [key: string]: Ilaw };
//   allIds: string[];
// }
export interface Ilaw {
  // id: string;
  LawUri: number;
  LawName: string;
  Components: Icomponent[];
}
