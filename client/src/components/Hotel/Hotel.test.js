import { BrowserRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react'
import Hotel from './Hotel.js';

// test suite example
describe('Hotel component', () => {
    // test() /
    it('Should display hotel name', () => {
        render(
            // router needed cuz Hotel component uses Link
            <BrowserRouter>
                <Hotel />
            </BrowserRouter>
        );

        // screen /
        expect(document.querySelector('h3').textContent).toBe('Plaza Munich');
    });
});