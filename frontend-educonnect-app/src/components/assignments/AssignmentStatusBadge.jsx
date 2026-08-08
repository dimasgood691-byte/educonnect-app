import React from 'react';
import Badge from '../ui/Badge';

const AssignmentStatusBadge = ({ status }) => {
    if (status === 'completed') {
        return <Badge variant="success" size="sm">Selesai</Badge>;
    }

    return <Badge variant="warning" size="sm">Belum Dikirim</Badge>;
};

export default AssignmentStatusBadge;
