'use server'
import {draftMode} from "next/headers";
import {revalidatePath} from "next/cache";
import {IForm} from "@/sanity/globals/Forms";
import {client} from "@/sanity/lib/client";

export async function handleMakeDraft() {
  draftMode().enable();
}

export async function revalidate(url: string) {
  console.log("revalidate", url);
  if (url != null && url.length > 0) {
    revalidatePath(url)
  }
}
export async function submitFormData(fieldData: any, formData: IForm) {
  console.log('submitting form data', fieldData, formData);
  const res = await client.create({
    _type: 'formSubmission',
    form: {
      _type: 'reference',
      _ref: formData._id
    },
    fields: Object.keys(fieldData).map((key) => {
      return {
        name: key,
        value: fieldData[key],
        _key: key
      }
    })
  }, {
    token: process.env.NEXT_PUBLIC_SANITY_API_WRITE_TOKEN
  })

  // Zapier webhook integration - Uncomment to enable
  // const zapierWebhook = 'https://hooks.zapier.com/hooks/catch/'
  // const zapierRes = await fetch(zapierWebhook, {
  //   method: 'POST',
  //   headers: {
  //     'Content-Type': 'application/json'
  //   },
  //   body: JSON.stringify({
  //     formId: formData._id,
  //     formName: formData.name,
  //     submissionId: res._id,
  //     fields: fieldData
  //   })
  // });
  //
  // if (!zapierRes.ok) {
  //   console.error('Failed to submit to Zapier', zapierRes.status);
  // }

  if (res?._createdAt && res?._id) {
    return {
      success: true,
      message: 'Form submitted successfully',
      submission: res
    }
  }

  return {
    success: false,
    message: 'Form submission failed'
  }
}
