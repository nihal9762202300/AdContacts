// Fetch and display contacts
async function loadContacts() {
    try {
        const response = await fetch('/api/contacts');
        const contacts = await response.json();
        contacts.forEach(addContactToList);
    } catch (error) {
        console.error('Error loading contacts:', error);
    }
}

// Add a new contact
async function saveContact(contact) {
    try {
        const response = await fetch('/api/contacts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(contact),
        });
        const newContact = await response.json();
        addContactToList(newContact);
    } catch (error) {
        console.error('Error saving contact:', error);
    }
}

// Add contact to the list
function addContactToList(contact) {
    const li = document.createElement('li');
    li.innerHTML = `
        <strong>${contact.name}</strong><br>
        Category: ${contact.category}<br>
        Mobile: ${contact.mobile}<br>
        E-Mail: ${contact.email}<br>
        Address: ${contact.address}<br>
        Qualification: ${contact.qualification}<br>
        Favourites: ${contact.favourites}<br>
        Note: ${contact.note}
    `;
    document.getElementById('contactList').appendChild(li);
}

// Form submission
document.getElementById('contactForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    const contact = {
        category: document.getElementById('category').value,
        name: document.getElementById('name').value,
        mobile: document.getElementById('mobile').value,
        email: document.getElementById('email').value,
        address: document.getElementById('address').value,
        qualification: document.getElementById('qualification').value,
        favourites: document.getElementById('favourites').value,
        note: document.getElementById('note').value,
    };

    await saveContact(contact);
    document.getElementById('contactForm').reset();
});

// Load contacts on page load
window.onload = loadContacts;