import BodyLayout from "../../components/Layout/BodyLayout";
import ContactUs from "../../assets/contact-us.png";
import { Button, Input, Textarea } from "@nextui-org/react";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Typography from "../../components/Typography/Typography";
import axios from "axios";
import { toast } from "react-toastify";
import { useState } from "react";

const contactFormSchema = yup.object().shape({
  name: yup.string().required("Name is required").trim(),
  email: yup.string().email().required("Email is required"),
  message: yup.string().required("Messag is required").trim(),
});

const Contact = () => {
  const [loading, setLoading] = useState(false);
  const {
    control,
    reset,
    formState: { errors },
    handleSubmit,
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
    resolver: yupResolver(contactFormSchema),
  });

  const onSubmit = async (data) => {
    setLoading(true);
    console.log(errors, data, "data DD");
    const result = await axios.post(import.meta.env.VITE_FORMSPREE_LINK, data);
    console.log(result, "result DD");
    if (result.status === 200) {
      reset();
      toast.success("Message sent!");
    }
    setLoading(false);
  };
  console.log(errors, "errors DD");
  return (
    <BodyLayout>
      <div className="mx-auto pb-20 w-[80%] flex flex-col lg:flex-row items-center gap-10">
        <img
          src={ContactUs}
          alt=""
          className="w-full lg:w-[50vw] xl:w-[60vw]"
        />
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full flex flex-col gap-6"
        >
          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <div className="flex flex-col gap-1">
                <Input
                  label="Name"
                  type="text"
                  placeholder="Your Name"
                  size="sm"
                  isInvalid={errors?.name?.message ? true : false}
                  {...field}
                />
                <Typography variant="error" className="ml-3">
                  {errors?.name?.message}
                </Typography>
              </div>
            )}
          />
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <div className="flex flex-col gap-1">
                <Input
                  label="Email"
                  type="email"
                  placeholder="Eg. email@address.com"
                  size="sm"
                  isInvalid={errors?.email?.message ? true : false}
                  {...field}
                />
                <Typography variant="error" className="ml-3">
                  {errors?.email?.message}
                </Typography>
              </div>
            )}
          />
          <Controller
            name="subject"
            control={control}
            render={({ field }) => (
              <div className="flex flex-col gap-1">
                <Input
                  label="Subject"
                  type="text"
                  placeholder="Subject of your message"
                  size="sm"
                  {...field}
                />
                <Typography variant="error" className="ml-3">
                  {errors?.subject?.message}
                </Typography>
              </div>
            )}
          />
          <Controller
            name="message"
            control={control}
            render={({ field }) => (
              <div className="flex flex-col gap-1">
                <Textarea
                  label="Message"
                  type="text"
                  placeholder="Your Message"
                  size="sm"
                  isInvalid={errors?.message?.message ? true : false}
                  {...field}
                />
                <Typography variant="error" className="ml-3">
                  {errors?.message?.message}
                </Typography>
              </div>
            )}
          />
          <Button
            type="submit"
            variant="shadow"
            isLoading={loading}
            className="mx-auto w-[250px]"
          >
            Submit
          </Button>
        </form>
      </div>
    </BodyLayout>
  );
};

export default Contact;
