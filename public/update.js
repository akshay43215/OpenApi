
const searchForm = document.getElementById("searchForm");
const updateForm = document.getElementById("updateForm");
const fieldsContainer = document.getElementById("fields");
const statusText = document.getElementById("status");

let originalPayload = {};
let currentAsin = "";

/* ---------------- SEARCH ---------------- */

searchForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const asin = document.getElementById("asin").value.trim().toUpperCase();
  statusText.textContent = "Loading...";

  try {
    const res = await fetch(`/api/v1/data/asin/${asin}`);
    if (!res.ok) throw new Error("Product not found");

    const json = await res.json();

    originalPayload = json.data.payload;
    currentAsin = asin;

    buildForm(originalPayload);
    updateForm.classList.remove("hidden");

    statusText.textContent = "Product loaded";
  } catch (err) {
    updateForm.classList.add("hidden");
    statusText.textContent = err.message;
  }
});

/* ---------------- FORM BUILDER ---------------- */

function buildForm(payload) {
  fieldsContainer.innerHTML = "";

  Object.entries(payload).forEach(([key, value]) => {
    const field = document.createElement("div");

    const label = document.createElement("label");
    label.textContent = key;

    let input;

    switch (typeof value) {
      case "number":
        input = document.createElement("input");
        input.type = "number";
        input.value = value;
        break;

      case "boolean":
        input = document.createElement("input");
        input.type = "checkbox";
        input.checked = value;
        break;

      default:
        input = document.createElement("input");
        input.type = isDate(value) ? "date" : "text";
        input.value = value;
    }

    input.dataset.key = key;

    field.appendChild(label);
    field.appendChild(input);
    fieldsContainer.appendChild(field);
  });
}

function isDate(value) {
  return (
    typeof value === "string" &&
    /^\d{4}-\d{2}-\d{2}/.test(value)
  );
}

/* ---------------- UPDATE ---------------- */

updateForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const diff = {};

  fieldsContainer.querySelectorAll("input").forEach((input) => {
    const key = input.dataset.key;
    let value;

    if (input.type === "checkbox") {
      value = input.checked;
    } else if (input.type === "number") {
      value = Number(input.value);
    } else {
      value = input.value;
    }

    if (value !== originalPayload[key]) {
      diff[key] = value;
    }
  });

  if (!Object.keys(diff).length) {
    statusText.textContent = "No changes detected";
    return;
  }
  diff['Asin'] = currentAsin; // Ensure ASIN is included in the payload
  statusText.textContent = "Updating...";

  const res = await fetch(`/api/v1/data/asin/${currentAsin}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ payload: diff }),
  });

  if (res.ok) {
    statusText.textContent = "Update successful";
    originalPayload = { ...originalPayload, ...diff };
  } else {
    statusText.textContent = "Update failed";
  }
});
