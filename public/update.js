
const searchForm = document.getElementById("searchForm");
const updateForm = document.getElementById("updateForm");
const fieldsContainer = document.getElementById("fields");
const statusText = document.getElementById("status");

let originalPayload = {};
let currentAsin = "";

let mode = "update";

document.querySelectorAll('input[name="mode"]').forEach(radio => {
  radio.addEventListener("change", (e) => {
    mode = e.target.value;

    if (mode === "create") {
      updateForm.classList.remove("hidden");
      searchForm.classList.add("hidden");
      clearUpdateForm();
      statusText.textContent = "Create new product";
    } else {
      updateForm.classList.add("hidden");
      searchForm.classList.remove("hidden");

      statusText.textContent = "Modify existing product";
    }
  });
});

/* ---------------- SEARCH ---------------- */

searchForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  if (mode === "create") return;

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
    label.setAttribute("for", key);
    label.textContent = key;

    let input;

    switch (typeof value) {
      case "number":
        input = document.createElement("input");
        input.type = "number";
        input.value = value;
        input.step="any"
        input.min="0"
        input.oninput="this.value = this.value === '' ? '' : parseFloat(this.value)"
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

    input.id = key;
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

  const payload = {};
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

    if (key === "tags") {
      value = value.split(",").map(t => t.trim()).filter(Boolean);
    }

    payload[key] = value;
  });

    if (mode === "update") {
      const diff = {};

      Object.keys(payload).forEach(key => {
        if (JSON.stringify(payload[key]) !== JSON.stringify(originalPayload[key])) {
          diff[key] = payload[key];
        }
      });

      if (!Object.keys(diff).length) {
        statusText.textContent = "No changes detected";
        return;
      }

      diff.Asin = currentAsin;

      await sendRequest("PUT", `/api/v1/data/asin/${currentAsin}`, diff);
    } else {
      await sendRequest("POST", `/api/v1/data/`, payload);
    }
  });

function clearUpdateForm() {
  fieldsContainer.querySelectorAll("input").forEach((input) => {
    switch (input.type) {
      case "checkbox":
        input.checked = false;
        break;

      default:
        input.value = "";
    }
  });
}

async function sendRequest(method, url, payload) {
  statusText.textContent = "Saving...";

  const res = await fetch(url, {
    method,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ payload })
  });

  if (res.ok) {
    statusText.textContent = method === "POST"
      ? "Product created successfully"
      : "Update successful";

    clearUpdateForm();
  } else {
    statusText.textContent = "Operation failed";
  }
}
