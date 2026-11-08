(() => {
    "use strict";

    const STORAGE_KEY = "taskflow.tasks";
    const CATEGORIES = ["Infrastructure", "CI/CD", "Monitoring", "Security", "Other"];

    const els = {
        list: document.getElementById("task-list"),
        total: document.getElementById("total-tasks"),
        completed: document.getElementById("completed-tasks"),
        pending: document.getElementById("pending-tasks"),
        addBtn: document.getElementById("add-task-btn"),
    };

    /* ---------------------------------------------------------------
       State and storage
       --------------------------------------------------------------- */

    let tasks = load();

    function load() {
        try {
            const raw = localStorage.getItem(STORAGE_KEY);
            const parsed = raw ? JSON.parse(raw) : [];
            return Array.isArray(parsed) ? parsed : [];
        } catch (err) {
            console.error("Could not read saved tasks:", err);
            return [];
        }
    }

    function save() {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
        } catch (err) {
            console.error("Could not save tasks:", err);
        }
    }

    function newId() {
        return (window.crypto && crypto.randomUUID)
            ? crypto.randomUUID()
            : String(Date.now()) + Math.random().toString(16).slice(2);
    }

    /* ---------------------------------------------------------------
       Rendering
       --------------------------------------------------------------- */

    function formatDue(value) {
        if (!value) return "";
        const date = new Date(value + "T00:00:00");
        if (Number.isNaN(date.getTime())) return "";
        return "Due " + date.toLocaleDateString(undefined, { month: "short", day: "numeric" });
    }

    function buildTask(task) {
        const row = document.createElement("div");
        row.className = "task-item" + (task.done ? " completed" : "");
        row.dataset.id = task.id;

        const check = document.createElement("input");
        check.type = "checkbox";
        check.checked = task.done;
        check.setAttribute("aria-label", `Mark "${task.title}" as ${task.done ? "pending" : "complete"}`);

        const body = document.createElement("div");
        const title = document.createElement("p");
        title.className = "task-title";
        title.textContent = task.title;
        const meta = document.createElement("p");
        meta.className = "task-meta";
        meta.textContent = [formatDue(task.due), task.category].filter(Boolean).join(" · ");
        body.append(title, meta);

        const badge = document.createElement("span");
        badge.className = "badge " + (task.done ? "badge-done" : "badge-pending");
        badge.textContent = task.done ? "Completed" : "Pending";

        const del = document.createElement("button");
        del.type = "button";
        del.className = "task-delete";
        del.textContent = "Delete";
        del.setAttribute("aria-label", `Delete "${task.title}"`);

        row.append(check, body, badge, del);
        return row;
    }

    function render() {
        els.list.replaceChildren(...tasks.map(buildTask));

        const done = tasks.filter((t) => t.done).length;
        els.total.textContent = tasks.length;
        els.completed.textContent = done;
        els.pending.textContent = tasks.length - done;
    }

    function commit() {
        save();
        render();
    }

    /* ---------------------------------------------------------------
       Task actions (event delegation on the list)
       --------------------------------------------------------------- */

    els.list.addEventListener("change", (event) => {
        if (!event.target.matches('input[type="checkbox"]')) return;
        const id = event.target.closest(".task-item").dataset.id;
        const task = tasks.find((t) => t.id === id);
        if (task) {
            task.done = event.target.checked;
            commit();
        }
    });

    els.list.addEventListener("click", (event) => {
        const btn = event.target.closest(".task-delete");
        if (!btn) return;
        const id = btn.closest(".task-item").dataset.id;
        tasks = tasks.filter((t) => t.id !== id);
        commit();
    });

    /* ---------------------------------------------------------------
       Add-task dialog (built here so the template stays minimal)
       --------------------------------------------------------------- */

    const dialog = document.createElement("dialog");
    dialog.className = "task-dialog";
    dialog.setAttribute("aria-labelledby", "task-dialog-title");
    dialog.innerHTML = `
        <form method="dialog" id="task-form" novalidate>
            <h2 id="task-dialog-title">Add task</h2>

            <label for="task-title-input">Title</label>
            <input id="task-title-input" name="title" type="text" maxlength="120" required
                   placeholder="e.g. Rotate staging credentials">
            <p class="field-error" id="task-title-error" hidden>Enter a title for the task.</p>

            <div class="field-row">
                <div>
                    <label for="task-category-input">Category</label>
                    <select id="task-category-input" name="category">
                        ${CATEGORIES.map((c) => `<option>${c}</option>`).join("")}
                    </select>
                </div>
                <div>
                    <label for="task-due-input">Due date (optional)</label>
                    <input id="task-due-input" name="due" type="date">
                </div>
            </div>

            <div class="dialog-actions">
                <button type="button" class="btn-secondary" data-cancel>Cancel</button>
                <button type="submit" class="btn-primary">Add task</button>
            </div>
        </form>
    `;
    document.body.appendChild(dialog);

    const form = dialog.querySelector("#task-form");
    const titleInput = dialog.querySelector("#task-title-input");
    const titleError = dialog.querySelector("#task-title-error");

    function openDialog() {
        form.reset();
        titleError.hidden = true;
        titleInput.removeAttribute("aria-invalid");
        dialog.showModal();
        titleInput.focus();
    }

    els.addBtn.addEventListener("click", openDialog);
    dialog.querySelector("[data-cancel]").addEventListener("click", () => dialog.close());

    // Close when clicking the backdrop
    dialog.addEventListener("click", (event) => {
        if (event.target === dialog) dialog.close();
    });

    form.addEventListener("submit", (event) => {
        event.preventDefault();
        const data = new FormData(form);
        const title = String(data.get("title") || "").trim();

        if (!title) {
            titleError.hidden = false;
            titleInput.setAttribute("aria-invalid", "true");
            titleInput.focus();
            return;
        }

        tasks.unshift({
            id: newId(),
            title,
            category: String(data.get("category") || "Other"),
            due: String(data.get("due") || ""),
            done: false,
            created: Date.now(),
        });
        commit();
        dialog.close();
    });

    /* ---------------------------------------------------------------
       Init
       --------------------------------------------------------------- */

    render();
})();
