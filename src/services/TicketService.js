import Ticket from "../models/Ticket.js";
import Product from "../models/Product.js";

class TicketService {
  async createTicket(purchaser, products) {
    // Verificar stock y calcular total
    let totalAmount = 0;
    const updatedProducts = [];

    for (const item of products) {
      const product = await Product.findById(item.product);

      if (!product) throw new Error(`Producto con ID ${item.product} no encontrado`);
      if (product.stock < item.quantity) {
        throw new Error(`Stock insuficiente para el producto: ${product.name}`);
      }

      product.stock -= item.quantity;
      await product.save();

      totalAmount += product.price * item.quantity;
      updatedProducts.push({ product: product._id, quantity: item.quantity });
    }

    // Generar código único para el ticket
    const ticketCode = `TCK-${Date.now()}-${Math.floor(Math.random() * 1000)}`;

    // Crear el ticket
    const ticket = await Ticket.create({
      code: ticketCode,
      purchaser,
      amount: totalAmount,
      products: updatedProducts,
    });

    return ticket;
  }

  async getTickets() {
    return await Ticket.find().populate("products.product");
  }
}

export default new TicketService();
