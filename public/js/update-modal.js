document.getElementById('number-btn').addEventListener('click', () => {
  document.getElementById('updateModal').style.display = 'flex';
});

document.getElementById('updateModal').addEventListener('click', (e) => {
  if (e.target.id === 'updateModal') {
    e.target.style.display = 'none';
  }
});

document.getElementById('submitUpdateBtn').addEventListener('click', submitUpdate);

async function submitUpdate() {
  const pass = document.getElementById('updatePassword').value.trim();
  if (!pass) return alert('Please enter password');

  try {
    const res = await fetch('/api/notification/update-password', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password: pass })
    });

    const data = await res.json();
    if (data.success) {
      alert('Password updated successfully!');
    } else {
      alert(data.message || 'Update failed');
    }
    document.getElementById('updateModal').style.display = 'none';
  } catch (err) {
    alert('Error: ' + err.message);
  }
}
