/*
	jsrepo 1.24.1
	Installed from github/davidhdev/react-bits
	1-8-2025
*/

import { useState, useEffect, useMemo, useRef } from 'react';
import { useTransition, a } from '@react-spring/web';

import './Masonry.scss';

function Masonry() {
  const [columns, setColumns] = useState(2);
  const data = [
    {
      id: 1,
      logo: 'https://via.placeholder.com/50',
      heading: '100% Natural Ingredients',
      content: 'Sustainably sourced herbs and botanicals, free from harmful chemicals.',
      height: 500,
    },
    {
      id: 2,
      logo: 'https://via.placeholder.com/50',
      heading: 'Holistic Wellness',
      content: 'Addressing root causes for long-lasting results and overall harmony.',
      height: 500,
    },
    {
      id: 3,
      logo: 'https://via.placeholder.com/50',
      heading: 'Authentic Formulations',
      content: 'Crafted using authentic Ayurvedic recipes refined with modern research.',
      height: 500,
    },
    {
      id: 4,
      logo: 'https://via.placeholder.com/50',
      heading: 'Eco-Friendly Practices',
      content: 'Committed to sustainable packaging and environmentally friendly practices.',
      height: 500,
    },
    // Add more items
  ];

  useEffect(() => {
    const updateColumns = () => {
      if (window.matchMedia('(min-width: 1500px)').matches) {
        setColumns(5);
      } else if (window.matchMedia('(min-width: 1000px)').matches) {
        setColumns(4);
      } else if (window.matchMedia('(min-width: 600px)').matches) {
        setColumns(3);
      } else {
        setColumns(1); // Breakpoint for mobile devices
      }
    };

    updateColumns();
    window.addEventListener('resize', updateColumns);
    return () => window.removeEventListener('resize', updateColumns);
  }, []);

  const ref = useRef();
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      if (ref.current) {
        setWidth(ref.current.offsetWidth);
      }
    };

    handleResize(); // Set initial width
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [ref]);

  const [heights, gridItems] = useMemo(() => {
    let heights = new Array(columns).fill(0);
    let gridItems = data.map((child) => {
      const column = heights.indexOf(Math.min(...heights));
      const x = (width / columns) * column;
      const y = (heights[column] += child.height / 2) - child.height / 2;
      return { ...child, x, y, width: width / columns, height: child.height / 2 };
    });
    return [heights, gridItems];
  }, [columns, data, width]);

  const transitions = useTransition(gridItems, {
    keys: (item) => item.id, // Use a unique key based on the id
    from: ({ x, y, width, height }) => ({ x, y, width, height, opacity: 0 }),
    enter: ({ x, y, width, height }) => ({ x, y, width, height, opacity: 1 }),
    update: ({ x, y, width, height }) => ({ x, y, width, height }),
    leave: { height: 0, opacity: 0 },
    config: { mass: 5, tension: 500, friction: 100 },
    trail: 25,
  });

  // Render the grid
  return (
    <div ref={ref} className='masonry' style={{ height: Math.max(...heights) }}>
      {transitions((style, item) => (
        <a.div key={item.id} style={style}>
          <div
            className="card"
            style={{
              backgroundColor: '#ffffff', // Set background if needed
              width: '100%',
              height: '100%',
              border: '1px solid #ddd',
              borderRadius: '8px',
              padding: '16px',
              boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            {/* Logo */}
            <img
              src={item.logo}
              alt="Logo"
              style={{
                width: '50px',
                height: '50px',
                marginBottom: '8px',
                objectFit: 'contain',
              }}
            />

            {/* Heading */}
            <h3
              style={{
                fontSize: '16px',
                fontWeight: 'bold',
                marginBottom: '8px',
                textAlign: 'center',
                color: '#333',
              }}
            >
              {item.heading}
            </h3>

            {/* Content */}
            <p
              style={{
                fontSize: '14px',
                color: '#666',
                textAlign: 'center',
              }}
            >
              {item.content}
            </p>
          </div>
        </a.div>
      ))}
    </div>
  );
}

export default Masonry;
