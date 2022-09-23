import React from 'react'

const About = () => {
    return (
        <>
            <div className="container">
                <h3 className="py-3">About Us</h3>
                <p>
                    MeetYourDoctor is a platform for booking medical consultations with specialist doctors in your city online. Patient can book an
                    appointment by selecting any of the time slot given by doctor.</p>
                <p> Some additional functionalities are - user can search a
                    doctor by area, specialization and can pay fees online through Razorpay, both user and doctor can manage their booked appointments.
                </p>
                <p className="text-muted">Regards, from creators:
                    <ul>
                        <li>Omkar Mohite</li>
                        <li>Kunal Lokhande</li>
                    </ul>
                </p>
            </div>
        </>
    )
}

export default About;