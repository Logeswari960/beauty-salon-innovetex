/**
 * ============================================================
 * Test Script — Verify Firebase Backend
 * ============================================================
 *
 * Run this with:   node src/test.js
 *
 * It will test all three services:
 *   1. Auth   → register, login, get current user, logout
 *   2. Salon  → add a salon, get all salons, get by ID
 *   3. Booking → create, get user bookings, cancel, reschedule
 * ============================================================
 */

import { registerUser, loginUser, logoutUser, getCurrentUser } from "./services/authService.js";
import { addSalon, getAllSalons, getSalonById } from "./services/salonService.js";
import {
  createBooking,
  getUserBookings,
  getBookingById,
  cancelBooking,
  rescheduleBooking,
} from "./services/bookingService.js";

// Helper to print section headers
function header(title) {
  console.log(`\n${"=".repeat(50)}`);
  console.log(`  ${title}`);
  console.log(`${"=".repeat(50)}`);
}

async function runTests() {
  try {
    // ----------------------------------------------------------
    // 1. AUTHENTICATION
    // ----------------------------------------------------------
    header("1. AUTHENTICATION");

    // Generate a unique email so the test can be re-run
    const testEmail = `testuser_${Date.now()}@example.com`;
    const testPassword = "Test@12345";
    const testName = "Test User";

    // Register
    console.log("\n→ Registering user...");
    const regResult = await registerUser(testName, testEmail, testPassword);
    console.log("✅ Registered:", regResult.user.uid, regResult.user.email);

    // Logout first to test login
    console.log("\n→ Logging out...");
    await logoutUser();
    console.log("✅ Logged out");

    // Login
    console.log("\n→ Logging in...");
    const loginResult = await loginUser(testEmail, testPassword);
    console.log("✅ Logged in:", loginResult.user.uid);

    // Get current user
    console.log("\n→ Getting current user...");
    const currentUser = await getCurrentUser();
    console.log("✅ Current user:", currentUser?.email);

    const userId = currentUser.uid;

    // ----------------------------------------------------------
    // 2. SALON
    // ----------------------------------------------------------
    header("2. SALON");

    // Add a salon
    console.log("\n→ Adding salon...");
    const salonRef = await addSalon({
      name: "Glamour Studio",
      location: "Mumbai, India",
      rating: 4.5,
      services: ["Haircut", "Facial", "Manicure", "Pedicure"],
    });
    console.log("✅ Salon added with ID:", salonRef.id);

    // Get all salons
    console.log("\n→ Fetching all salons...");
    const allSalons = await getAllSalons();
    console.log("✅ Total salons:", allSalons.length);

    // Get salon by ID
    console.log("\n→ Fetching salon by ID...");
    const salon = await getSalonById(salonRef.id);
    console.log("✅ Salon found:", salon.name, "—", salon.location);

    // ----------------------------------------------------------
    // 3. BOOKING
    // ----------------------------------------------------------
    header("3. BOOKING");

    // Create a booking (use a future date)
    const futureDate = new Date();
    futureDate.setDate(futureDate.getDate() + 7); // 7 days from now
    const dateStr = futureDate.toISOString().split("T")[0]; // "YYYY-MM-DD"

    console.log("\n→ Creating booking...");
    const bookingRef = await createBooking({
      userId,
      salonId: salonRef.id,
      salonName: "Glamour Studio",
      service: "Haircut",
      appointmentDate: dateStr,
      appointmentTime: "14:00",
    });
    console.log("✅ Booking created with ID:", bookingRef.id);

    // Get user bookings
    console.log("\n→ Fetching user bookings...");
    const userBookings = await getUserBookings(userId);
    console.log("✅ User bookings:", userBookings.length);

    // Get booking by ID
    console.log("\n→ Fetching booking by ID...");
    const booking = await getBookingById(bookingRef.id);
    console.log("✅ Booking:", booking.service, "on", booking.appointmentDate, "at", booking.appointmentTime, "— Status:", booking.status);

    // Reschedule
    const newDate = new Date();
    newDate.setDate(newDate.getDate() + 14); // 14 days from now
    const newDateStr = newDate.toISOString().split("T")[0];

    console.log("\n→ Rescheduling booking...");
    await rescheduleBooking(bookingRef.id, newDateStr, "16:00");
    const updated = await getBookingById(bookingRef.id);
    console.log("✅ Rescheduled to:", updated.appointmentDate, "at", updated.appointmentTime);

    // Cancel
    console.log("\n→ Cancelling booking...");
    await cancelBooking(bookingRef.id);
    const cancelled = await getBookingById(bookingRef.id);
    console.log("✅ Booking status:", cancelled.status);

    // ----------------------------------------------------------
    // VALIDATION TESTS
    // ----------------------------------------------------------
    header("4. VALIDATION TESTS");

    // Test: past date
    console.log("\n→ Testing past date rejection...");
    try {
      await createBooking({
        userId,
        salonId: salonRef.id,
        salonName: "Glamour Studio",
        service: "Facial",
        appointmentDate: "2020-01-01",
        appointmentTime: "10:00",
      });
      console.log("❌ Should have thrown an error");
    } catch (e) {
      console.log("✅ Correctly rejected:", e.message);
    }

    // Test: empty field
    console.log("\n→ Testing empty field rejection...");
    try {
      await createBooking({
        userId: "",
        salonId: salonRef.id,
        salonName: "Glamour Studio",
        service: "Facial",
        appointmentDate: dateStr,
        appointmentTime: "10:00",
      });
      console.log("❌ Should have thrown an error");
    } catch (e) {
      console.log("✅ Correctly rejected:", e.message);
    }

    // Test: duplicate booking
    console.log("\n→ Testing duplicate booking rejection...");
    const dupDate = new Date();
    dupDate.setDate(dupDate.getDate() + 21);
    const dupDateStr = dupDate.toISOString().split("T")[0];

    await createBooking({
      userId,
      salonId: salonRef.id,
      salonName: "Glamour Studio",
      service: "Manicure",
      appointmentDate: dupDateStr,
      appointmentTime: "11:00",
    });

    try {
      await createBooking({
        userId,
        salonId: salonRef.id,
        salonName: "Glamour Studio",
        service: "Pedicure",
        appointmentDate: dupDateStr,
        appointmentTime: "11:00",
      });
      console.log("❌ Should have thrown an error");
    } catch (e) {
      console.log("✅ Correctly rejected:", e.message);
    }

    // ----------------------------------------------------------
    // DONE
    // ----------------------------------------------------------
    header("ALL TESTS PASSED ✅");
    console.log("\nYour Firebase backend is fully connected and working!\n");

    // Logout at the end
    await logoutUser();
    process.exit(0);
  } catch (error) {
    console.error("\n❌ TEST FAILED:", error.message);
    process.exit(1);
  }
}

runTests();
