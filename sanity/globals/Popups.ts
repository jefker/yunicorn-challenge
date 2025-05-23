import {PortableTextBlock, defineField, defineType} from "sanity";
import {IForm} from "@/sanity/globals/Forms";

export const PopupType = defineType({
  name: 'popup',
  type: 'document',
  title: 'Popup',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
    }),
    defineField({
      name: 'content',
      title: 'Content',
      type: 'richtext',
    }),
    defineField({
      name: 'showForm',
      title: 'Show Form',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'form',
      title: 'Form',
      type: 'reference',
      // @ts-ignore
      to: [{type: 'form'}],
      hidden: ({parent}) => !parent?.showForm,
    }),
  ],
})

export interface IPopup {
  name: string;
  content: PortableTextBlock[];
  showForm: boolean;
  form: IForm;
}