BEGIN
    INSERT INTO tb_leave_balance (id, current_year, last_year) VALUES (NEW.id, 13-MONTH(NOW()), 0);
END