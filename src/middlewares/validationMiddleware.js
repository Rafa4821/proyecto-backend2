export const validateTicketData = (req, res, next) => {
    const { products } = req.body;
    if (!Array.isArray(products) || products.length === 0) {
      return res.status(400).json({ message: "Los productos son requeridos" });
    }
  
    for (const item of products) {
      if (!item.product || !item.quantity || item.quantity <= 0) {
        return res.status(400).json({
          message: "Cada producto debe incluir un ID y una cantidad válida",
        });
      }
    }
  
    next();
  };
  