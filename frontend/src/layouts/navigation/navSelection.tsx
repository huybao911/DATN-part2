import { Box, List, ListItemText } from '@mui/material';
import { StyledNavItem, StyledNavItemIcon } from './style';
import IconUser from './ic_user'
import { Link } from 'react-router-dom';



export default function NavSection() {
    return (
        <Link to='*'>
            <Box >
                <List disablePadding sx={{ p: 1 }}>
                    <StyledNavItem
                        sx={{
                            '&.active': {
                                color: 'text.primary',
                                bgcolor: 'action.selected',
                                fontWeight: 'fontWeightBold',
                            },
                        }}
                    >
                        <StyledNavItemIcon>
                            {<IconUser />}
                        </StyledNavItemIcon>

                        <ListItemText disableTypography> User </ListItemText>

                    </StyledNavItem>
                </List>
            </Box>
        </Link>
    )
}