import { appointmentCreate, appointmentCreatePublic } from '../../utils/Api';

export const handleAppointmentSubmit = async (e, setAppointmentLoading, setAppointmentMessage, setAppointmentError, slot, userId) => {
  e.preventDefault();
  
  // Capture the form element before async operations
  const formElement = e.currentTarget;
  
  const form = new FormData(formElement);
  const name = form.get('name');
  const phone = form.get('phone');
  const date = form.get('date');
  
  // Validate form data
  if (!name || !phone || !date) {
    setAppointmentError('Please fill in all fields');
    setAppointmentMessage(''); // Clear any previous success message
    return;
  }
  
  // Combine date and time slot
  const appointmentDateTime = new Date(`${date}T${slot}:00`);
  
  setAppointmentLoading(true);
  setAppointmentMessage(''); // Clear previous messages
  setAppointmentError('');   // Clear previous errors
  
  try {
    // Check if userId is provided (public user) or if we should use authenticated endpoint
    let response;
    if (userId) {
      // Public user - use public endpoint
      response = await appointmentCreatePublic(userId, {
        clientName: name,
        phone: phone,
        appointmentDate: appointmentDateTime,
        notes: `Appointment requested for ${slot}`
      });
    } else {
      // Authenticated user - use regular endpoint
      response = await appointmentCreate({
        clientName: name,
        phone: phone,
        appointmentDate: appointmentDateTime,
        notes: `Appointment requested for ${slot}`
      });
    }
    
    // Debugging: log the response to see its structure
    console.log('Appointment response:', response);
    
    // Check if response has data and handle accordingly
    if (response && response.data) {
      if (response.data.success) {
        setAppointmentMessage('Appointment booked successfully!');
        setAppointmentError(''); 
        if (formElement) {
          formElement.reset();
        }
      } else {
        setAppointmentError(response.data.message || 'Failed to book appointment');
        setAppointmentMessage(''); // Clear any previous success message
      }
    } else {
      // If response structure is different, check status
      if (response && (response.status === 200 || response.status === 201)) {
        setAppointmentMessage('Appointment booked successfully!');
        setAppointmentError(''); 
        if (formElement) {
          formElement.reset();
        }
      } else {
        setAppointmentError('Failed to book appointment. Please try again.');
        setAppointmentMessage(''); // Clear any previous success message
      }
    }
  } catch (err) {
    console.error('Appointment error:', err);
    console.error('Error response:', err.response);
    
    // Check if the appointment was actually created despite the error
    if (err.response && (err.response.status === 200 || err.response.status === 201)) {
      // If we get a 200/201 status, the appointment was likely created
      setAppointmentMessage('Appointment booked successfully!');
      setAppointmentError(''); // Clear any previous error
      // Reset form using the captured element
      if (formElement) {
        formElement.reset();
      }
    } else {
      // Actual error occurred
      const errorMessage = err.response?.data?.message || 
                          err.response?.data?.error || 
                          err.response?.data || 
                          err.message || 
                          'Error booking appointment. Please try again.';
      setAppointmentError(errorMessage);
      setAppointmentMessage(''); // Clear any previous success message
    }
  } finally {
    setAppointmentLoading(false);
  }
};

export const renderAppointmentForm = (handleAppointment, appointmentMessage, appointmentError, appointmentLoading, slot, setSlot, accent) => {
  return (
    <>
      <div>
        <p className="text-sm">Select a slot:</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {['09:00','11:00','13:00','15:00','17:00'].map((t) => (
            <button
              key={t}
              onClick={() => setSlot(t)}
              className={`px-3 py-1 rounded-full text-sm ${slot===t ? 'text-white' : 'text-[#333]'}`}
              style={{ backgroundColor: slot===t ? accent : '#f3f0ff' }}
            >
              {t}
            </button>
          ))}
        </div>
      </div>
      <form onSubmit={handleAppointment} className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
        <input name="name" placeholder="Your name" className="px-3 py-2 rounded-lg bg-[#f7f5ff]" />
        <input name="phone" placeholder="Phone" className="px-3 py-2 rounded-lg bg-[#f7f5ff]" />
        <input type="date" name="date" className="px-3 py-2 rounded-lg bg-[#f7f5ff] col-span-1 sm:col-span-2" />
        {appointmentMessage && (
          <div className="col-span-1 sm:col-span-2 rounded-md bg-green-50 p-3">
            <p className="text-sm text-green-700">{appointmentMessage}</p>
          </div>
        )}
        {appointmentError && (
          <div className="col-span-1 sm:col-span-2 rounded-md bg-red-50 p-3">
            <p className="text-sm text-red-700">{appointmentError}</p>
          </div>
        )}
        <button 
          type="submit"
          disabled={appointmentLoading}
          className="sm:col-span-2 mt-2 w-full px-4 py-2 rounded-lg text-white font-medium disabled:opacity-50" 
          style={{ backgroundColor: accent }}
        >
          {appointmentLoading ? 'Booking...' : 'Make Appointment'}
        </button>
      </form>
    </>
  );
};