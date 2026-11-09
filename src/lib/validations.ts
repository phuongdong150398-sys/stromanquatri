import { z } from "zod";

export const quoteRequestSchema = z.object({
  fullName: z
    .string()
    .min(2, "Vui lòng nhập họ và tên (tối thiểu 2 ký tự)")
    .max(100, "Tên không được vượt quá 100 ký tự"),
  phone: z
    .string()
    .min(10, "Số điện thoại không hợp lệ")
    .max(12, "Số điện thoại không hợp lệ")
    .regex(/^(0|\+84)[3|5|7|8|9][0-9]{8}$/, "Định dạng số điện thoại Việt Nam không đúng (VD: 0912345678)"),
  email: z.string().email("Địa chỉ email không hợp lệ").optional().or(z.literal("")),
  province: z.string().min(1, "Vui lòng chọn Tỉnh / Thành phố công trình"),
  companyOrProject: z.string().optional(),
  role: z.enum(["contractor", "dealer", "consultant", "individual"], {
    errorMap: () => ({ message: "Vui lòng chọn loại hình đối tác" }),
  }),
  deliveryAddress: z.string().optional(),
  notes: z.string().max(500, "Ghi chú không được dài quá 500 ký tự").optional(),
});

export const dealerRegisterSchema = z.object({
  businessName: z.string().min(3, "Vui lòng nhập tên công ty hoặc cửa hàng kinh doanh"),
  contactPerson: z.string().min(2, "Vui lòng nhập họ tên người liên hệ"),
  phone: z
    .string()
    .regex(/^(0|\+84)[3|5|7|8|9][0-9]{8}$/, "Số điện thoại không đúng định dạng (VD: 0912345678)"),
  email: z.string().email("Email không hợp lệ"),
  province: z.string().min(1, "Vui lòng chọn Tỉnh/Thành phố"),
  district: z.string().min(1, "Vui lòng chọn Quận/Huyện"),
  currentBusiness: z.string().min(1, "Vui lòng chọn lĩnh vực đang kinh doanh"),
  estimatedMonthlyVolume: z.string().optional(),
  notes: z.string().optional(),
});

export const contactFormSchema = z.object({
  fullName: z.string().min(2, "Vui lòng nhập họ và tên"),
  phone: z.string().regex(/^(0|\+84)[3|5|7|8|9][0-9]{8}$/, "Số điện thoại không hợp lệ"),
  email: z.string().email("Email không hợp lệ").optional().or(z.literal("")),
  subject: z.string().min(3, "Vui lòng nhập tiêu đề yêu cầu"),
  message: z.string().min(10, "Nội dung tin nhắn tối thiểu 10 ký tự"),
});
