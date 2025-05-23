import {
  defineArrayMember,
  defineField,
  defineType,
} from "sanity";
import {IPageLink} from "@/sanity/globals/CTA";
import {GROQPageLinkSchema} from "@/sanity/lib/definitions";

export const FormFieldType = defineType({
  name: 'formField',
  type: 'object',
  title: 'Form Field',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
    }),
    defineField({
      name: 'label',
      title: 'Label',
      type: 'string',
    }),
    defineField({
      name: 'placeholder',
      title: 'Placeholder',
      type: 'string',
    }),
    defineField({
      name: 'type',
      title: 'Type',
      type: 'string',
      options: {
        list: [
          {title: 'Text', value: 'text'},
          {title: 'Email', value: 'email'},
          {title: 'Phone', value: 'phone'},
          {title: 'Textarea', value: 'textarea'},
          {title: 'Checkbox', value: 'checkbox'},
        ],
      },
    }),
    defineField({
      name: 'required',
      title: 'Required',
      type: 'boolean',
    }),
  ],
  preview: {
    select: {
      title: 'label',
      subtitle: 'name'
    }
  },
})

export interface IFormField {
  name: string;
  label: string;
  placeholder: string;
  type: 'text' | 'email' | 'phone' | 'textarea' | 'checkbox';
  required: boolean;
}

export const FormSubmission = defineField({
  name: 'formSubmission',
  title: 'Form Submission',
  type: 'document',
  fields: [
    defineField({
      name: 'form',
      title: 'Form',
      type: 'reference',
      // @ts-ignore
      to: [{type: 'form'}],
    }),
    defineField({
      name: 'fields',
      title: 'Fields',
      type: 'array',
      // @ts-ignore
      of: [
        defineArrayMember({
          name: 'field',
          title: 'Field',
          type: 'object',
          fields: [
            defineField({
              name: 'name',
              title: 'Name',
              type: 'string',
            }),
            defineField({
              name: 'value',
              title: 'Value',
              type: 'string',
            }),
          ],
          preview: {
            select: {
              title: 'name',
              subtitle: 'value'
            }
          }
        })
      ]
    }),
  ],
  preview: {
    select: {
      title: 'fields.0.name',
      subtitle: 'fields.0.value',
    }
  }
})

export interface FormSubmission {
  form: string;
  fields: {
    name: string;
    value: string;
  }[];
}

export const FormType = defineType({
  name: "form",
  type: "document",
  title: "Form",
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
    }),
    defineField({
      name: "settings",
      title: "Settings",
      type: "object",
      // @ts-ignore
      fields: [
        defineField({
          name: "onSubmit",
          title: "On Submit",
          type: "string",
          options: {
            list: [
              { title: "Direct Message", value: "message" },
              { title: "Redirect", value: "redirect" },
            ],
          },
          initialValue: "message",
        }),
        defineField({
          name: "submitText",
          title: "Submit Text",
          type: "string",
          description: "Text to display on submit button",
          initialValue: "Einsenden",
        }),

        defineField({
          name: "message",
          title: "Message",
          type: "text",
          description: "Message to display on successful form submission",
          // @ts-ignore
          hidden: ({ document }) => document?.settings?.onSubmit !== "message",
        }),
        defineField({
          name: "redirect",
          title: "Redirect",
          type: "pageLink",
          description: "URL to redirect to on successful form submission",
          // @ts-ignore
          hidden: ({ document }) => document?.settings?.onSubmit !== "redirect",
        }),
        defineField({
          name: "endpoint",
          title: "Form Endpoint (Optional)",
          type: "string",
          description: "Custom endpoint for form submissions. Leave empty to use default handler.",
        }),
      ],
      initialValue: {
        onSubmit: "message",
        submitText: "Einsenden",
        message: "Vielen Dank für Ihre Einsendung!",
      },
    }),
    defineField({
      name: "fields",
      title: "Fields",
      type: "array",
      // @ts-ignore
      of: [
        defineArrayMember({
          name: "field",
          title: "Field",
          type: "formField",
        }),
      ],
    }),
  ],
});

export interface IForm {
  _id: string;
  name: string;
  settings: {
    onSubmit: "message" | "redirect";
    submitText: string;
    message?: string;
    redirect?: IPageLink;
    portalId: string;
    formId: string;
  };
  fields: IFormField[];
}

export const FormSubmissionSchema = `
{
  _id,
  name,
  fields,
  settings{
    onSubmit,
    submitText,
    message,
    redirect${GROQPageLinkSchema},
    portalId,
    formId,
  }
}
`;
