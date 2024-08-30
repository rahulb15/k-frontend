import React from 'react';
import { Box, List, ListItem, ListItemText, Button, Typography } from '@mui/material';

const NotificationDropdown = ({ notifications, onViewAll }) => {
    return (
        <Box sx={{ position: 'absolute', top: '100%', right: 0, width: 300, maxHeight: 400, overflowY: 'auto', bgcolor: 'background.paper', boxShadow: 3, borderRadius: 1, zIndex: 1000 }}>
            <List>
                {notifications.slice(0, 5).map((notification) => (
                    <ListItem key={notification.id}>
                        <ListItemText 
                            primary={notification.title}
                            secondary={notification.message}
                        />
                    </ListItem>
                ))}
            </List>
            <Box sx={{ p: 2, borderTop: 1, borderColor: 'divider' }}>
                <Button fullWidth variant="contained" onClick={onViewAll}>
                    View All Notifications
                </Button>
            </Box>
        </Box>
    );
};

export default NotificationDropdown;