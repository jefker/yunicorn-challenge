"use client";

import { z } from "zod";
import parsePhoneNumberFromString from "libphonenumber-js";
import { IForm } from "@/sanity/globals/Forms";
import React, { useMemo } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shadcn/ui/form";
import { Input } from "@/shadcn/ui/input";
import { Button } from "@/shadcn/ui/button";
import { stegaClean } from "@sanity/client/stega";
import { submitFormData } from "@/helpers/formHandler";
import { usePostHog } from "posthog-js/react";
import { sendGTMEvent } from "@next/third-parties/google";
import { resolvePageLink } from "@/sanity/globals/CTA";
import { useRouter } from "next/navigation";

export default function SanityForm({ formData }: { formData: IForm }) {
  const postHog = usePostHog();
  const [loading, setLoading] = React.useState(false);
  const [successMessage, setSuccessMessage] = React.useState<string | null>(
    null
  );
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null);
  const router = useRouter();

  const cleanFormData = useMemo(() => {
    return stegaClean(formData);
  }, [formData]);

  const formFields = useMemo(() => {
    return cleanFormData?.fields?.reduce((obj, item) => {
      return {
        ...obj,
        [item.name]:
          item.type === "text"
            ? z.string()
            : item.type === "email"
              ? z.string().email()
              : item.type === "phone"
                ? z.string().transform((arg, ctx) => {
                    const phone = parsePhoneNumberFromString(arg, {
                      defaultCountry: "DE",
                      extract: false,
                    });

                    if (phone && phone.isValid()) {
                      return phone.number;
                    }

                    if (
                      (arg === "" || arg === null || arg === undefined) &&
                      !item.required
                    ) {
                      return arg;
                    }

                    ctx.addIssue({
                      code: z.ZodIssueCode.custom,
                      message: "Invalid phone number",
                    });

                    return z.NEVER;
                  })
                : z.unknown(),
      };
    }, {});
  }, [cleanFormData]);

  const formSchema = useMemo(() => {
    return z.object(formFields);
  }, [formFields]);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: cleanFormData?.fields?.reduce((obj, item) => {
      return {
        ...obj,
        [item.name]: "",
      };
    }),
  });

  async function onSubmit(fieldData: any) {
    if (cleanFormData && fieldData) {
      setLoading(true);
      if (fieldData.email) {
        postHog.identify(fieldData.email);
      }
      postHog.capture("form_submit", {
        form: cleanFormData._id,
        formTitle: cleanFormData.name,
        fields: fieldData,
      });
      const res = await submitFormData(
        fieldData,
        formData,
        window?.location?.href,
        document?.title
      );
      if (res?.success === true) {
        sendGTMEvent({
          event: "hsFormSubmit",
          "hs-form-guid": cleanFormData?.settings?.formId ?? null,
          pageName: document.title,
          pagePath: window.location.href,
          // @ts-ignore
          "form-firstname": formData.firstName,
          // @ts-ignore
          "form-email": formData.email,
        });

        if (cleanFormData?.settings?.onSubmit === "message") {
          setSuccessMessage(
            cleanFormData?.settings?.message ?? "Form submitted successfully"
          );
        } else if (cleanFormData?.settings?.onSubmit === "redirect") {
          const redirectUrl = resolvePageLink(
            cleanFormData?.settings?.redirect ?? null
          );
          if (redirectUrl) {
            router.push(redirectUrl);
          } else {
            setSuccessMessage(
              `Form submitted successfully. Could not redirect to page ${redirectUrl}`
            );
          }
        }
      } else {
        setLoading(false);
        setErrorMessage("Form submission failed. Try again later.");
      }
    }
  }

  return (
    <>
      {cleanFormData?.fields ? (
        <Form {...form}>
          <form
            className="w-full flex flex-col justify-start items-stretch gap-[2rem] relative max-w-full pb-[1rem]"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            {cleanFormData?.fields?.map((formField, index) => {
              return (
                <FormField
                  key={index}
                  control={form.control}
                  // @ts-ignore - this is a valid prop
                  name={formField.name}
                  disabled={loading}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{formField.label}</FormLabel>
                      <FormControl>
                        {
                          // @ts-ignore - this is a valid prop
                          <Input
                            placeholder={formField.placeholder}
                            {...field}
                            value={undefined}
                          />
                        }
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              );
            })}
            <Button
              type="submit"
              disabled={loading}
              variant="default"
              size="lg"
              shape="round"
              className="w-full relative group mt-[2rem]"
            >
              {/* Text + Icon */}
              <span className="button-cta relative z-[4] flex items-center gap-[1rem]">
                <div className="button-text relative">
                  <div className="button-text-initial transition-all duration-300">
                    {formData?.settings?.submitText ?? "Submit"}
                  </div>
                  <div className="button-text-hover absolute top-[3rem] transition-all duration-300 pointer-events-none">
                    {formData?.settings?.submitText ?? "Submit"}
                  </div>
                </div>

                <div className="button-icon relative w-[3rem] h-[3rem] [&_svg]:w-full overflow-clip">
                  <div className="button-icon-initial transition-all duration-300">
                    {/* Icon */}
                    <svg width="3.125rem" height="3rem" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <g clipPath="url(#clip0_924_8265)">
                        <path d="M19.9825 16.5283L18.4825 16.5224L18.52 7.07994L6.02819 19.4729L4.9749 18.4113L17.4667 6.01825L8.02427 5.98077L8.03023 4.48078L20.0301 4.52842L19.9825 16.5283Z" fill="currentColor" />
                      </g>
                      <defs>
                        <clipPath id="clip0_924_8265">
                          <rect width="24" height="24" fill="white" transform="matrix(1 0 0 -1 0.5 24)" />
                        </clipPath>
                      </defs>
                    </svg>
                  </div>
                  <div className="button-icon-hover absolute top-[2.25rem] -left-[2.25rem] transition-all duration-300 pointer-events-none">
                    {/* Same Icon Hover */}
                    <svg width="3.125rem" height="3rem" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <g clipPath="url(#clip0_924_8265)">
                        <path d="M19.9825 16.5283L18.4825 16.5224L18.52 7.07994L6.02819 19.4729L4.9749 18.4113L17.4667 6.01825L8.02427 5.98077L8.03023 4.48078L20.0301 4.52842L19.9825 16.5283Z" fill="currentColor" />
                      </g>
                      <defs>
                        <clipPath id="clip0_924_8265">
                          <rect width="24" height="24" fill="white" transform="matrix(1 0 0 -1 0.5 24)" />
                        </clipPath>
                      </defs>
                    </svg>
                  </div>
                </div>
              </span>
            </Button>
            {successMessage && (
              <div className="w-full bg-green-100 border-green-500 border rounded-sm font-bold text-green-900 py-[1rem] px-[2rem] drop-shadow-md">
                {successMessage}
              </div>
            )}
            {errorMessage && (
              <div className="w-full bg-red-100 border-red-500 border rounded-sm font-bold text-red-900 py-[1rem] px-[2rem] drop-shadow-md">
                {errorMessage}
              </div>
            )}
          </form>
        </Form>
      ) : (
        <div className="bg-gray-100 border-black border-2 rounded-xl font-bold text-blue-900 p-20">
          MISSING FORM DATA
        </div>
      )}
    </>
  );
}
