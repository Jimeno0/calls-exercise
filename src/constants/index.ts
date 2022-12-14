export const API_URL = "https://frontend-test-api.aircall.dev/graphql";
export const API_SOCKET = "wss://frontend-test-api.aircall.dev/websocket";

export const PATHS = {
  home: "/",
  login: "/login",
  detail: "/detail/:id",
  detailWithParam: (id: string) => `/detail/${id}`,
};

export const ANSWERED = "answered";
export const MISSED = "missed";
export const VOICEMAIl = "voicemail";
export const INBOUND = "inbound";
export const OUTBOUND = "outbound";

export const COLUMN_HEADERS = [
  {
    id: "id",
    label: "Id",
  },
  {
    id: "created_at",
    label: "DATE",
  },
  {
    id: "call_type",
    label: "CALL TYPE",
  },
  {
    id: "direction",
    label: "DIRECTION",
  },
  {
    id: "duration",
    label: "DURATION (s)",
  },
];
