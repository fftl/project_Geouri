import instance from "../../Redux/modules/instance";

export const levelApi = {
  getLevel: (requestBody) => instance.put("mirror/member/level", requestBody),
};
