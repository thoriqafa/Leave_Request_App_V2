BEGIN
    DECLARE employee_id INT;
    DECLARE leave_duration INT;
    DECLARE last_year_balance INT;

    -- Memperoleh ID karyawan yang terkait dengan permintaan cuti yang diperbarui
    SET employee_id = (SELECT employee FROM tb_leave_request WHERE id = NEW.id);

    SET last_year_balance = (SELECT last_year FROM tb_leave_balance WHERE id = employee_id);

    -- Memperoleh durasi cuti dari permintaan yang diperbarui
    SET leave_duration = (SELECT duration FROM tb_leave_request WHERE id = NEW.id);

    -- Cek apakah leave_status pada permintaan yang diperbarui adalah 2
    IF NEW.current_status = 2 THEN
        -- Lakukan update pada tb_leave_balance dengan mengurangi durasi cuti
        IF leave_duration <= last_year_balance THEN
            UPDATE tb_leave_balance
            SET last_year = last_year - leave_duration,
                current_year = current_year
            WHERE id = employee_id;
        ELSEIF leave_duration > last_year_balance THEN
            UPDATE tb_leave_balance
            SET last_year = 0,
                current_year = (current_year + last_year_balance) - leave_duration
            WHERE id = employee_id;
        END IF;
    ELSEIF NEW.current_status = 3 OR NEW.current_status = 4 THEN
        -- Dalam kasus leave_status = 3 atau 4, gunakan nilai sebelumnya dari tb_leave_balance
        UPDATE tb_leave_balance
        SET current_year = current_year
        WHERE id = employee_id;
    END IF;
END