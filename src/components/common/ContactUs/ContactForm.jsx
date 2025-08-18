import React, { useState } from "react";
import GlobalForm from "../GlobalForm";
import { ContactApi } from "@/api/api";
import { useSiteSetting } from "@/context/useSiteSettings";
import Link from "next/link";
import { CircularProgress, FormHelperText } from "@mui/material";
import { toast } from "react-toastify";

const form_json = [
  {
    type: "text",
    name: "full_name",
    label: "Full Name",
    fullWidth: true,
    xs: 12,
    validation_message: "Please enter full name",
    required: true,
  },

  {
    type: "email",
    name: "email",
    label: "Email Address",
    fullWidth: true,
    xs: 12,
    validation_message: "Please enter email",
    required: true,
  },

  {
    type: "number",
    name: "phone_number",
    label: "Phone Number",
    fullWidth: true,
    xs: 12,
    validation_message: "Please enter phone number",
    required: true,
  },
  {
    type: "text",
    name: "message",
    label: "Message",
    fullWidth: true,
    multiline: true,
    rows: 5,
    xs: 12,
    validation_message: "Please enter message",
    required: true,
  },
];

const ContactForm = () => {
  const { settings } = useSiteSetting();
  const [loading, setloading] = useState(false);

  const [agree, setAgree] = useState(false);
  const [checkboxError, setCheckboxError] = useState(false);

  const handleSubmit = async (values, resetForm) => {
    if (!agree) {
      setCheckboxError(true);
      return;
    }

    setloading(true);
    try {
      await ContactApi.post("", values);
      toast.success("Your enquiry has been successfully submitted");
      resetForm();
    } catch (error) {
      toast.error("Failed href submit", error);
    } finally {
      setloading(false);
    }
  };

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "60vh",
        }}
      >
        <CircularProgress sx={{ color: "#3C7777" }} />
      </div>
    );
  }

  return (
    <div className="contact-us-container">
      <div className="form">
        <GlobalForm
          form_config={form_json}
          on_Submit={handleSubmit}
          btnClassName={"orange-cta"}
          btnText={"Save"}
          showSubmitBtn={false}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "flex-start",
                marginTop: "20px",
                padding: "0 10px",
              }}
            >
              <input
                type="checkbox"
                id="remember_me"
                checked={agree}
                onChange={(e) => setAgree(e.target.checked)}
                style={{ margin: "5px 10px 0", cursor: "pointer" }}
              />
              <label htmlFor="remember_me">
                By checking submit, you agree to be contacted via phone and
                email regarding your interest in our services. We will treat
                your data with confidentiality in accordance with our{" "}
                <Link href={"/privacy-policy"}>privacy policy.</Link>
              </label>
            </div>
            {checkboxError && (
              <FormHelperText sx={{ paddingLeft: "45px" }} error>
                Please accept the terms.
              </FormHelperText>
            )}
          </div>

          <button type="submit" className="cta-btn" disabled={loading}>
            Send Message
          </button>
        </GlobalForm>
      </div>

      <div className="right-side">
        <div className="iframe">
          <div className="title">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M11.9989 14.1714C9.86891 14.1714 8.12891 12.4414 8.12891 10.3014C8.12891 8.16141 9.86891 6.44141 11.9989 6.44141C14.1289 6.44141 15.8689 8.17141 15.8689 10.3114C15.8689 12.4514 14.1289 14.1714 11.9989 14.1714ZM11.9989 7.94141C10.6989 7.94141 9.62891 9.00141 9.62891 10.3114C9.62891 11.6214 10.6889 12.6814 11.9989 12.6814C13.3089 12.6814 14.3689 11.6214 14.3689 10.3114C14.3689 9.00141 13.2989 7.94141 11.9989 7.94141Z"
                fill="#3C7777"
              />
              <path
                d="M12.0016 22.76C10.5216 22.76 9.03164 22.2 7.87164 21.09C4.92164 18.25 1.66164 13.72 2.89164 8.33C4.00164 3.44 8.27164 1.25 12.0016 1.25C12.0016 1.25 12.0016 1.25 12.0116 1.25C15.7416 1.25 20.0116 3.44 21.1216 8.34C22.3416 13.73 19.0816 18.25 16.1316 21.09C14.9716 22.2 13.4816 22.76 12.0016 22.76ZM12.0016 2.75C9.09164 2.75 5.35164 4.3 4.36164 8.66C3.28164 13.37 6.24164 17.43 8.92164 20C10.6516 21.67 13.3616 21.67 15.0916 20C17.7616 17.43 20.7216 13.37 19.6616 8.66C18.6616 4.3 14.9116 2.75 12.0016 2.75Z"
                fill="#3C7777"
              />
            </svg>

            <p>Address</p>
          </div>

          <iframe
            src={
              "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1598.0057155916966!2d55.209723728321464!3d25.147437908304695!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f6a30bd9bc1b3%3A0xe5a6537b687e28a1!2s977%20Al%20Wasl%20Rd%20-%20Al%20Manara%20-%20Dubai%20-%20United%20Arab%20Emirates!5e0!3m2!1sen!2sin!4v1744437088467!5m2!1sen!2sin"
            }
            loading="lazy"
          ></iframe>
        </div>

        <div className="address-info">
          <p
            className="address"
            dangerouslySetInnerHTML={{ __html: settings?.address }}
          />
        </div>

        <div className="contact-info">
          <div className="title">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M17.45 22.75C16.32 22.75 15.13 22.48 13.9 21.96C12.7 21.45 11.49 20.75 10.31 19.9C9.14 19.04 8.01 18.08 6.94 17.03C5.88 15.96 4.92 14.83 4.07 13.67C3.21 12.47 2.52 11.27 2.03 10.11C1.51 8.87 1.25 7.67 1.25 6.54C1.25 5.76 1.39 5.02 1.66 4.33C1.94 3.62 2.39 2.96 3 2.39C3.77 1.63 4.65 1.25 5.59 1.25C5.98 1.25 6.38 1.34 6.72 1.5C7.11 1.68 7.44 1.95 7.68 2.31L10 5.58C10.21 5.87 10.37 6.15 10.48 6.43C10.61 6.73 10.68 7.03 10.68 7.32C10.68 7.7 10.57 8.07 10.36 8.42C10.21 8.69 9.98 8.98 9.69 9.27L9.01 9.98C9.02 10.01 9.03 10.03 9.04 10.05C9.16 10.26 9.4 10.62 9.86 11.16C10.35 11.72 10.81 12.23 11.27 12.7C11.86 13.28 12.35 13.74 12.81 14.12C13.38 14.6 13.75 14.84 13.97 14.95L13.95 15L14.68 14.28C14.99 13.97 15.29 13.74 15.58 13.59C16.13 13.25 16.83 13.19 17.53 13.48C17.79 13.59 18.07 13.74 18.37 13.95L21.69 16.31C22.06 16.56 22.33 16.88 22.49 17.26C22.64 17.64 22.71 17.99 22.71 18.34C22.71 18.82 22.6 19.3 22.39 19.75C22.18 20.2 21.92 20.59 21.59 20.95C21.02 21.58 20.4 22.03 19.68 22.32C18.99 22.6 18.24 22.75 17.45 22.75ZM5.59 2.75C5.04 2.75 4.53 2.99 4.04 3.47C3.58 3.9 3.26 4.37 3.06 4.88C2.85 5.4 2.75 5.95 2.75 6.54C2.75 7.47 2.97 8.48 3.41 9.52C3.86 10.58 4.49 11.68 5.29 12.78C6.09 13.88 7 14.95 8 15.96C9 16.95 10.08 17.87 11.19 18.68C12.27 19.47 13.38 20.11 14.48 20.57C16.19 21.3 17.79 21.47 19.11 20.92C19.62 20.71 20.07 20.39 20.48 19.93C20.71 19.68 20.89 19.41 21.04 19.09C21.16 18.84 21.22 18.58 21.22 18.32C21.22 18.16 21.19 18 21.11 17.82C21.08 17.76 21.02 17.65 20.83 17.52L17.51 15.16C17.31 15.02 17.13 14.92 16.96 14.85C16.74 14.76 16.65 14.67 16.31 14.88C16.11 14.98 15.93 15.13 15.73 15.33L14.97 16.08C14.58 16.46 13.98 16.55 13.52 16.38L13.25 16.26C12.84 16.04 12.36 15.7 11.83 15.25C11.35 14.84 10.83 14.36 10.2 13.74C9.71 13.24 9.22 12.71 8.71 12.12C8.24 11.57 7.9 11.1 7.69 10.71L7.57 10.41C7.51 10.18 7.49 10.05 7.49 9.91C7.49 9.55 7.62 9.23 7.87 8.98L8.62 8.2C8.82 8 8.97 7.81 9.07 7.64C9.15 7.51 9.18 7.4 9.18 7.3C9.18 7.22 9.15 7.1 9.1 6.98C9.03 6.82 8.92 6.64 8.78 6.45L6.46 3.17C6.36 3.03 6.24 2.93 6.09 2.86C5.93 2.79 5.76 2.75 5.59 2.75ZM13.95 15.01L13.79 15.69L14.06 14.99C14.01 14.98 13.97 14.99 13.95 15.01Z"
                fill="#3C7777"
              />
            </svg>

            <p>Contact Us</p>
          </div>

          <div className="info">
            {settings?.contact_number && (
              <p>Phone no :- {settings?.contact_number}</p>
            )}

            {settings?.email && <p>Email :- {settings?.email}</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;
