-- ========================================
-- Load Pricing Analysis (Simplified)
-- ========================================

WITH loads AS (
    SELECT 
        load_id,
        customer,
        distance,
        revenue,
        status,
        DATE(order_date) as order_date
    FROM loads_table
    WHERE status NOT IN ('CANCELLED')
),

aggregated AS (
    SELECT 
        customer,
        COUNT(*) AS total_loads,
        SUM(revenue) AS total_revenue,
        AVG(distance) AS avg_distance
    FROM loads
    GROUP BY customer
)

SELECT * FROM aggregated
ORDER BY total_revenue DESC;
