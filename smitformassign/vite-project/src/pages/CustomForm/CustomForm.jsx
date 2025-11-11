import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Swal from 'sweetalert2';

const formSchema = z.object({
  country: z
    .string()
    .min(1, "Country is required")
    .refine((val) => val !== "Select country", {
      message: "Please select your country",
    }),
  classPreference: z
    .string()
    .min(1, "Class preference is required")
    .refine((val) => val !== "Select class preference", {
      message: "Please select your class preference",
    }),
  gender: z
    .string()
    .min(1, "Gender is required")
    .refine((val) => val !== "Select gender", {
      message: "Please select your gender",
    }),
  city: z
    .string()
    .min(1, "City is required")
    .refine((val) => val !== "Select city", {
      message: "Please select your city",
    }),
  course: z
    .string()
    .min(1, "Course selection is required")
    .refine((val) => val !== "Select course or event", {
      message: "Please select your course",
    }),
  fullName: z.string().min(3, "Full name must be at least 3 characters"),
  fatherName: z.string().min(3, "Father name must be at least 3 characters"),
  email: z.string().email("Invalid email address"),
  countryCode: z.string().min(1, "Country code is required"),
  phone: z.string()
    .regex(/^[0-9]{9,11}$/, "Phone must be 9-11 digits (without country code)")
    .min(9, "Phone must be at least 9 digits"),
  cnic: z.string().regex(/^[0-9]{13}$/, "CNIC must be 13 digits"),
  fatherCnic: z
    .string()
    .optional()
    .refine((val) => !val || /^[0-9]{13}$/.test(val), {
      message: "Father CNIC must be 13 digits",
    }),
  dob: z.string().min(1, "Date of birth is required"),
  proficiency: z
    .string()
    .min(1, "Select your computer proficiency")
    .refine((val) => val !== "Select your computer proficiency", {
      message: "Please select proficiency level",
    }),
  laptop: z
    .string()
    .min(1, "Laptop selection is required")
    .refine((val) => val !== "Do you have a Laptop?", {
      message: "Please select laptop option",
    }),
  qualification: z
    .string()
    .min(1, "Qualification is required")
    .refine((val) => val !== "Last qualification", {
      message: "Please select your qualification",
    }),
  address: z.string().min(5, "Address must be at least 5 characters long"),
  picture: z
    .any()
    .refine((files) => files instanceof FileList && files.length > 0, {
      message: "Picture is required",
    })
    .refine(
      (files) =>
        files instanceof FileList &&
        files.length > 0 &&
        files[0].size <= 3 * 1024 * 1024,
      {
        message: "File size must be less than 3MB",
      }
    )
    .refine(
      (files) =>
        files instanceof FileList &&
        ["image/jpeg", "image/png", "image/jpg"].includes(files[0]?.type),
      {
        message: "Invalid file format",
      }
    ),
     notRobot: z.boolean()
    .refine((val) => val === true, {
      message: "Please verify that you are not a robot",
    }),
});

function CustomForm() {
 
  const [submit, setSubmit] = useState(false);

  const Form = useForm({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data) => {
    setSubmit(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));
        const completePhone = data.countryCode ? `${data.countryCode}${data.phone.replace(/\s/g, '')}` : data.phone;
    
    const formData = {
      ...data,
      completePhone: completePhone
    };
    
    console.log("Form Data:", formData);

   
    Swal.fire({
      title: 'Success!',
      text: 'Your registration has been submitted successfully!',
      icon: 'success',
      confirmButtonText: 'OK',
      confirmButtonColor: '#3085d6',
      timer: 3000,
      timerProgressBar: true,
    });
    Form.reset();
    setPreview(null);
    setSubmit(false);
  };
  const [preview, setPreview] = useState(null);
  return (
    <div className="min-h-screen max-w-8xl mx-auto bg-white py-10 px-4">
      <div
        className="relative text-center bg-cover bg-center bg-no-repeat h-52 mb-8"
        style={{
          backgroundImage:
            'url("https://images.unsplash.com/photo-1541462608143-67571c6738dd?auto=format&fit=crop&w=1740&q=80")',
        }}
      >
        <div className="absolute inset-0 bg-white/80 flex justify-center items-center flex-col">
          <img
            src="https://forms.saylanimit.com/static/media/logo.22bf709605809177256c.png"
            alt=""
            className="w-[250px] text-center"
          />
          <h1 className="text-2xl font-bold text-black">
            Registration Form - SMIT
          </h1>
          <p className="text-gray-500 text-xs font-bold pt-5">
            Services - Education - Registration
          </p>
          <div className="flex justify-center space-x-6 mt-4">
            <span className="font-semibold text-green-700">Registration</span>
            <span className="text-blue-900 font-semibold">
              Download ID Card
            </span>
            <span className="text-blue-900 font-semibold">Results</span>
          </div>
        </div>
      </div>

      <form
        onSubmit={Form.handleSubmit(onSubmit)}
        className="max-w-4xl mx-auto bg-white border border-gray-200 shadow-md rounded-lg p-8 space-y-6"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-blue-800 text-sm mb-1">
              Select country
            </label>
            <select
              className="w-full border border-green-400 rounded-md px-3 py-2 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500 transition-all"
              {...Form.register("country")}
            >
              <option>Select country</option>
              <option value="pakistan">Pakistan</option>
              <option value="turkey">Turkey</option>
              <option value="yemen">Yemen</option>
            </select>
            {Form.formState.errors.country && (
              <p className="text-red-700 text-sm">
                {Form.formState.errors.country.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-blue-800 text-sm mb-1">
              Select class preference
            </label>
            <select
              {...Form.register("classPreference")}
              className="w-full border border-green-400 rounded-md px-3 py-2"
            >
              <option>Select class preference</option>
              <option value="online">Online</option>
              <option value="onsite">Onsite</option>
            </select>
            {Form.formState.errors.classPreference && (
              <p className="text-red-700 text-sm">
                {Form.formState.errors.classPreference.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-blue-800 text-sm mb-1">
              Select gender
            </label>
            <select
              {...Form.register("gender")}
              className="w-full border border-green-400 rounded-md px-3 py-2"
            >
              <option>Select gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
            {Form.formState.errors.gender && (
              <p className="text-red-700 text-sm">
                {Form.formState.errors.gender.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-blue-800 text-sm mb-1">
              Select city
            </label>
            <select
              {...Form.register("city")}
              className="w-full border border-green-400 rounded-md px-3 py-2"
            >
              <option>Select city</option>
              <option value="karachi">Karachi</option>
              <option value="lahore">Lahore</option>
              <option value="islamabad">Islamabad</option>
            </select>
            {Form.formState.errors.city && (
              <p className="text-red-700 text-sm">
                {Form.formState.errors.city.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-blue-800 text-sm mb-1">
              Select course or event
            </label>
            <select
              {...Form.register("course")}
              className="w-full border border-green-400 rounded-md px-3 py-2"
            >
              <option>Select course or event</option>
              <option value="webdevelopment">Web Development</option>
              <option value="graphicdesign">Graphic Design</option>
            </select>
            {Form.formState.errors.course && (
              <p className="text-red-700 text-sm">
                {Form.formState.errors.course.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-blue-800 text-sm mb-1">
              Full name
            </label>
            <input
              type="text"
              placeholder="Full name"
              {...Form.register("fullName")}
              className="w-full border border-green-400 rounded-md px-3 py-2"
            />
            {Form.formState.errors.fullName && (
              <p className="text-red-700 text-sm">
                {Form.formState.errors.fullName.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-blue-800 text-sm mb-1">
              Father name
            </label>
            <input
              type="text"
              placeholder="Father name"
              {...Form.register("fatherName")}
              className="w-full border border-green-400 rounded-md px-3 py-2"
            />
            {Form.formState.errors.fatherName && (
              <p className="text-red-700 text-sm">
                {Form.formState.errors.fatherName.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-blue-800 text-sm mb-1">Email</label>
            <input
              type="text"
              placeholder="Email"
              {...Form.register("email")}
              className="w-full border border-green-400 rounded-md px-3 py-2"
            />
            {Form.formState.errors.email && (
              <p className="text-red-700 text-sm">
                {Form.formState.errors.email.message}
              </p>
            )}
          </div>

         <div>
  <label className="block text-blue-800 text-sm mb-1">Phone</label>
  <div className="flex">
    {/* Country Code Dropdown */}
    <select
      {...Form.register("countryCode")}
      className="w-24 border border-green-400 rounded-l-md px-3 py-2 border-r-0"
    >
      <option value="+92">PK +92</option>
      <option value="+1">US +1</option>
      <option value="+44">UK +44</option>
      <option value="+91">IN +91</option>
      <option value="+971">UAE +971</option>
      <option value="+966">KSA +966</option>
      <option value="+20">EG +20</option>
    </select>
    
    {/* Phone Number Input */}
    <input
      type="text"
      placeholder="300 1234567"
      {...Form.register("phone")}
      className="flex-1 border border-green-400 rounded-r-md px-3 py-2"
    />
  </div>
  {Form.formState.errors.phone && (
    <p className="text-red-700 text-sm">
      {Form.formState.errors.phone.message}
    </p>
  )}
</div>

          <div>
            <label className="block text-blue-800 text-sm mb-1">CNIC</label>
            <input
              type="text"
              placeholder="CNIC"
              {...Form.register("cnic")}
              className="w-full border border-green-400 rounded-md px-3 py-2"
            />
            {Form.formState.errors.cnic && (
              <p className="text-red-700 text-sm">
                {Form.formState.errors.cnic.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-blue-800 text-sm mb-1">
              Father's CNIC (optional)
            </label>
            <input
              type="text"
              placeholder="Father's CNIC"
              {...Form.register("fatherCnic")}
              className="w-full border border-green-400 rounded-md px-3 py-2"
            />
            {Form.formState.errors.fatherCnic && (
              <p className="text-red-700 text-sm">
                {Form.formState.errors.fatherCnic.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-blue-800 text-sm mb-1">
              Date of birth
            </label>
            <input
              type="date"
              {...Form.register("dob")}
              className="w-full border border-green-400 rounded-md px-3 py-2"
            />
            {Form.formState.errors.dob && (
              <p className="text-red-700 text-sm">
                {Form.formState.errors.dob.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-blue-800 text-sm mb-1">
              Computer proficiency
            </label>
            <select
              {...Form.register("proficiency")}
              className="w-full border border-green-400 rounded-md px-3 py-2"
            >
              <option>Select your computer proficiency</option>
              <option value="none">None</option>
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
            </select>
            {Form.formState.errors.proficiency && (
              <p className="text-red-700 text-sm">
                {Form.formState.errors.proficiency.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-blue-800 text-sm mb-1">
              Do you have a Laptop?
            </label>
            <select
              {...Form.register("laptop")}
              className="w-full border border-green-400 rounded-md px-3 py-2"
            >
              <option>Do you have a Laptop?</option>
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
            {Form.formState.errors.laptop && (
              <p className="text-red-700 text-sm">
                {Form.formState.errors.laptop.message}
              </p>
            )}
          </div>

          <div className="md:col-span-2">
            <label className="block text-blue-800 text-sm mb-1">
              Last qualification
            </label>
            <select
              {...Form.register("qualification")}
              className="w-full border border-green-400 rounded-md px-3 py-2"
            >
              <option>Last qualification</option>
              <option value="matric">Matric</option>
              <option value="intermediate">Intermediate</option>
              <option value="undergraduate">Undergraduate</option>
              <option value="graduate">Graduate</option>
              <option value="master">Master</option>
              <option value="phd">PhD</option>
              <option value="others">Others</option>
            </select>
            {Form.formState.errors.qualification && (
              <p className="text-red-700 text-sm">
                {Form.formState.errors.qualification.message}
              </p>
            )}
          </div>

          <div className="md:col-span-2">
            <label className="block text-blue-800 text-sm mb-1">Address</label>
            <input
              type="text"
              placeholder="Address"
              {...Form.register("address")}
              className="w-full border border-green-400 rounded-md px-3 py-2"
            />
            {Form.formState.errors.address && (
              <p className="text-red-700 text-sm">
                {Form.formState.errors.address.message}
              </p>
            )}
          </div>
        </div>

        <div className="border border-green-400 rounded-lg p-4">
          <label className="block text-blue-800 text-sm font-bold mb-3">
            Picture
          </label>

          <div className="bg-gray-50 border border-gray-300 rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 relative">
                <label className="flex justify-center items-center border-2 border-dotted border-gray-400 w-20 h-20 rounded-md cursor-pointer hover:border-blue-500 transition-all overflow-hidden">
                  {preview ? (
                    <img
                      src={preview}
                      alt="Preview"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <p className="text-xs text-gray-600 text-center">
                      + Upload
                    </p>
                  )}

                  <input
                    type="file"
                    accept=".jpg,.jpeg,.png"
                    className="hidden"
                    {...Form.register("picture", {
                      onChange: (e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          setPreview(URL.createObjectURL(file));
                        }
                      },
                    })}
                  />
                </label>

                {Form.formState.errors.picture && (
                  <p className="text-red-700 text-sm mt-1">
                    {Form.formState.errors.picture.message}
                  </p>
                )}
              </div>

              <div className="flex-1">
                <div className="text-sm text-gray-600 space-y-1">
                  <p className="text-[9px]">• With white or blue background</p>
                  <p className="text-[9px]">
                    • File size must be less than 3MB
                  </p>
                  <p className="text-[9px]">• File type: jpg, jpeg, png</p>
                  <p className="text-[9px]">
                    • Upload your recent passport size picture
                  </p>
                  <p className="text-[9px]">
                    • Your face should be clearly visible without any glasses
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="text-sm text-gray-700 space-y-2 pt-4 border-t border-gray-200">
          <p>
            1. I hereby solemnly declare that the data and facts mentioned
            herein are true and correct to the best of my knowledge. Further, I
            will abide by all the established and future regulations and
            policies of SMIT.
          </p>
          <p>
            2. I hereby accept the responsibilities of good conduct and
            guarantee that I will not be involved in any other activity,
            political or ethical, but learning during my stay in the program.{" "}
          </p>
          <p>
            3. Defiance will render my admission cancelled at any point in time.{" "}
          </p>
          <p>
            4. Upon completion of the course, I will complete the required
            project by SMIT.
          </p>
          <p>
            5. It's mandatory for female students to wear abaya/hijab in the
            class.
          </p>
        </div>

{/* ================================ */}


<div className="border border-gray-300 shadow-sm rounded-md p-3 flex items-center bg-white w-72">
  {/* Checkbox */}
  <input
    type="checkbox"
    {...Form.register("notRobot")}
    className="w-5 h-5 accent-blue-600 cursor-pointer"
  />

  {/* Text */}
  <p className="ml-3 text-gray-700 text-sm font-medium flex-1">
    I'm not a robot
  </p>

  {/* Google logo (fake reCAPTCHA image) */}
  <img
    src="https://www.gstatic.com/recaptcha/api2/logo_48.png"
    alt="reCAPTCHA"
    className="w-8 h-8 ml-2"
  />
</div>

{/* Error message display */}
{Form.formState.errors.notRobot && (
  <p className="text-red-700 text-sm mt-[-10px]">
    {Form.formState.errors.notRobot.message}
  </p>
)}




        <button
          type="submit"
          disabled={submit}
          className="w-full bg-blue-600 text-white px-8 py-2 rounded-md hover:bg-blue-800 transition-all"
        >
          {submit ? "Submitting..." : "SUBMIT"}
        </button>
      </form>
    </div>
  );
}

export default CustomForm;
