"use client";

import { IForm } from "@/sanity/globals/Forms";

export interface GenericFormSubmission {
  fields: {
    name: string;
    value: string;
  }[];
  context: {
    pageUri: string;
    pageName: string;
    timestamp: string;
  };
}

/**
 * Generic form submission handler for educational purposes
 * In a real application, you would replace this with your actual form processing logic
 * (e.g., send to your backend API, email service, CRM, etc.)
 */
export async function submitForm(data: GenericFormSubmission) {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Log form submission for educational purposes
  console.log("Form submitted:", data);
  
  // Simulate successful submission
  return {
    status: 200,
    data: {
      success: true,
      submissionId: `sub_${Date.now()}`,
      timestamp: new Date().toISOString()
    }
  };
}

export async function submitFormData(
  fieldData: any,
  formData: IForm,
  pageURI: string,
  pageName: string
) {
  const submissionData: GenericFormSubmission = {
    fields: [
      {
        name: "firstname",
        value: fieldData.firstname || "",
      },
      {
        name: "email",
        value: fieldData.email || "",
      },
      {
        name: "phone",
        value: fieldData.phone || "",
      },
    ],
    context: {
      pageUri: pageURI,
      pageName: pageName,
      timestamp: new Date().toISOString(),
    },
  };

  try {
    const res = await submitForm(submissionData);
    
    if (res?.status === 200) {
      return {
        success: true,
        message: "Form submitted successfully",
        submission: res,
      };
    }

    return {
      success: false,
      message: "Form submission failed",
    };
  } catch (e) {
    console.error("Form submission error:", e);
    return {
      success: false,
      message: "Form submission failed",
    };
  }
}

/**
 * Educational note: This is a mock form handler for learning purposes.
 * In production, you would typically:
 * 
 * 1. Send data to your backend API
 * 2. Integrate with email services (SendGrid, Mailgun, etc.)
 * 3. Connect to CRM systems (Salesforce, HubSpot, etc.)
 * 4. Store in databases
 * 5. Implement proper validation and security measures
 */