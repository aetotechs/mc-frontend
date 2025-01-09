// import { zodResolver } from "@hookform/resolvers/zod";
// import { useForm } from "react-hook-form";
// import { z } from "zod";

// import { Button } from "../../components/ui/button";
// import {
//   Form,
//   FormControl,
//   FormDescription,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "../../components/ui/form";
// import { Input } from "../../components/ui/input";
// import { useState } from "react";



// const FormSchema = z.object({
//   phoneNumber: z.string().min(2, {
//     message: "Field is required",
//   }),

//   username: z.string().min(2, { message: "Field is Required" }),

//   country: z.string().min(2, { message: "Field is Required" }),
//   city: z.string().min(2, { message: "Field is Required" }),
//   street: z.string().min(2, { message: "Field is Required" }),
//   postalCode: z.string().min(2, { message: "Field is Required" }),
//   gender: z.string().min(2, { message: "Field is Required " }),
// });

// export function AdditionalUserDetails({ handleClick }) {
//   const [submitting, setSubmitting] = useState(false);

//   const form =
//     useForm <
//     z.infer <
//     typeof FormSchema >>
//       {
//         resolver: zodResolver(FormSchema),
//         defaultValues: {
//           phoneNumber: "",
//           country: "",
//           username: "",
//           city: "",
//           postalCode: "",
//           street: "",
//           gender: "",
//         },
//       };

//   const onSubmit = async (data) => {};

//   return (
//     <Form {...form}>
//       <form
//         onSubmit={form.handleSubmit(onSubmit)}
//         className="w-full grid  grid-cols-2 relative  space-y-2"
//       >
//         <div className=" col-span-2 flex justify-between gap-3">
//           <FormField
//             control={form.control}
//             name="phoneNumber"
//             render={({ field }) => (
//               <FormItem className="grow">
//                 <FormLabel>PhoneNumber</FormLabel>
//                 <FormControl>
//                   <Input
//                     placeholder=""
//                     className=" border-[#DCE1EC]"
//                     {...field}
//                   />
//                 </FormControl>

//                 <FormMessage />
//               </FormItem>
//             )}
//           />

//           <FormField
//             control={form.control}
//             name="username"
//             render={({ field }) => (
//               <FormItem className="col-span-2">
//                 <FormLabel> username</FormLabel>
//                 <FormControl>
//                   <Input
//                     placeholder="johndoe@gmail"
//                     className=" border-[#DCE1EC]"
//                     {...field}
//                   />
//                 </FormControl>

//                 <FormMessage />
//               </FormItem>
//             )}
//           />
//         </div>

//         <FormField
//           control={form.control}
//           name="country"
//           render={({ field }) => (
//             <FormItem className="grow">
//               <FormLabel>Country</FormLabel>
//               <FormControl>
//                 <Input
//                   placeholder=""
//                   className=" border-[#DCE1EC]"
//                   {...field}
//                 />
//               </FormControl>

//               <FormMessage />
//             </FormItem>
//           )}
//         />

//         <FormField
//           control={form.control}
//           name="city"
//           render={({ field }) => (
//             <FormItem className="grow">
//               <FormLabel>City</FormLabel>
//               <FormControl>
//                 <Input
//                   placeholder=""
//                   className=" border-[#DCE1EC]"
//                   {...field}
//                 />
//               </FormControl>

//               <FormMessage />
//             </FormItem>
//           )}
//         />

//         <FormField
//           control={form.control}
//           name="street"
//           render={({ field }) => (
//             <FormItem className="grow">
//               <FormLabel>Street</FormLabel>
//               <FormControl>
//                 <Input
//                   placeholder=""
//                   className=" border-[#DCE1EC]"
//                   {...field}
//                 />
//               </FormControl>

//               <FormMessage />
//             </FormItem>
//           )}
//         />

//         <FormField
//           control={form.control}
//           name="postalCode"
//           render={({ field }) => (
//             <FormItem className="grow">
//               <FormLabel>Postal Code</FormLabel>
//               <FormControl>
//                 <Input
//                   placeholder=""
//                   className=" border-[#DCE1EC]"
//                   {...field}
//                 />
//               </FormControl>

//               <FormMessage />
//             </FormItem>
//           )}
//         />

//         <div className="col-span-2 my-3">
//           By clicking “Next”, I accept MyCrib's terms of use.
//         </div>
//         <div className="col-span-2 flex justify-between ">
//           <Button type="submit" className="w-full my-4 bg-[#C8CFDE]">
//             Back
//           </Button>

//           <Button type="submit" className="w-full my-4 bg-[#C8CFDE]">
//             Submit
//           </Button>
//         </div>
//       </form>
//     </Form>
//   );
// }
