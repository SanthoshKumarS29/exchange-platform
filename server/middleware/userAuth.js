
export const userAuth = (req, res, next) => {
    try{
        const authHeader = req.headers.authorization;

        if (!authHeader) {
            return res.status(401).json({
                success: false,
                message: "Authorization token is required",
            });
        }

        const token = authHeader.startsWith("Bearer ")
            ? authHeader.split(" ")[1] : null
        
        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Invalid authorization format",
            });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        if(decoded.role !== 'user'){
            return res.status(403).json({
                success: false,
                message: "Access denied. User role required.",
            });
        }

        req.user = decoded;
        next()

    } catch(error) {
        return res.status(401).json({
            success: false,
            message: "Invalid or expired token",
        });
    }
}