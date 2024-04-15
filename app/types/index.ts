import { DanhGia, DonThue, Users, Xe } from "@prisma/client";
export type SXe = Omit<
    Xe,
    "ngayTao"
> & {
    ngayTao: string;
}
export type SDonThue = Omit<
    DonThue,
    "ngayTao" | "ngayBatDau" | "ngayKetThuc" | "xe" | "users"
> & {
    ngayTao: string;
    ngayBatDau: string;
    ngayKetThuc: string;
    xe: SXe;
    users: SUsers;
}
export type SUsers = Omit<
    Users,
    "ngayTao"
>& {
    ngayTao: string;
}
export type SDanhGia = Omit<
    DanhGia,
    "ngayTao" | "users"
> & {
    ngayTao: string;
    users: SUsers
}
