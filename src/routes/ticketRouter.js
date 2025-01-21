import express from "express";
import ticketService from "../services/TicketService.js";
import { authenticateJwt } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Crear un nuevo ticket
router.post("/", authenticateJwt, async (req, res) => {
  try {
    const { products } = req.body;
    const purchaser = req.user.email;

    const ticket = await ticketService.createTicket(purchaser, products);
    res.status(201).json(ticket);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Obtener todos los tickets
router.get("/", authenticateJwt, async (req, res) => {
  try {
    const tickets = await ticketService.getTickets();
    res.status(200).json(tickets);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener los tickets", error });
  }
});

export default router;
