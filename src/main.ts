import { openModal } from "./modal.ts";

const form = document.forms[0];
console.log({ form });

const eligibleModal = document.getElementById(
  "eligible-modal",
) as HTMLDialogElement | null;
const notEligibleModal = document.getElementById(
  "not-eligible-modal",
) as HTMLDialogElement | null;

export function onSubmit(event: SubmitEvent) {
  event.preventDefault();
  const formData = new FormData(form);

  const questions = [...formData.entries()].filter(
    ([question, _]) => question !== "email",
  );

  const isEligible = questions.reduce((eligible, [_, answer]) => {
    if (answer === "Yes") return true;
    return eligible;
  }, false);

  const modal = isEligible ? eligibleModal : notEligibleModal;
  if (modal) {
    openModal(modal);
  }
}

form?.addEventListener("submit", onSubmit);
