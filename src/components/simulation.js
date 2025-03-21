import React, { useState, useEffect, useRef } from 'react';

const FloatingNeonElements = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef(null);
  
  // Shape definitions (all spheres now)
  const shapes = [
    { type: 'sphere', color: '#0ff', size: 60, position: { x: 20, y: 20 }, speed: { x: 0.5, y: 0.7 }, rotation: 0 },
    { type: 'sphere', color: '#f0f', size: 50, position: { x: 70, y: 40 }, speed: { x: 0.7, y: 0.5 }, rotation: 45 },
    { type: 'sphere', color: '#ff0', size: 40, position: { x: 40, y: 60 }, speed: { x: 0.9, y: 0.3 }, rotation: 0 },
    { type: 'sphere', color: '#0f0', size: 30, position: { x: 60, y: 30 }, speed: { x: 0.4, y: 0.8 }, rotation: 20 },
  ];
  
  const [elements, setElements] = useState(shapes);
  
  // Handle mouse movement
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setMousePosition({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top
        });
      }
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);
  
  // Animation loop
  useEffect(() => {
    let animationFrameId;
    
    const animate = () => {
      setElements(prevElements => 
        prevElements.map(element => {
          // Calculate distance to mouse
          const dx = mousePosition.x - element.position.x;
          const dy = mousePosition.y - element.position.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          // Subtle attraction to mouse
          const attractionFactor = 0.001;
          const mouseInfluenceX = dx * attractionFactor;
          const mouseInfluenceY = dy * attractionFactor;
          
          // Speed increase based on mouse proximity
          const baseSpeedX = element.speed.x;
          const baseSpeedY = element.speed.y;
          const speedFactor = Math.max(1, 1 + (400 - distance) / 200); // Increase speed as distance decreases, up to a max
          const newSpeedX = baseSpeedX * speedFactor;
          const newSpeedY = baseSpeedY * speedFactor;

          // Update position
          let newX = element.position.x + newSpeedX + mouseInfluenceX;
          let newY = element.position.y + newSpeedY + mouseInfluenceY;
          
          // Boundary check
          if (newX < 0 || newX > 100) element.speed.x *= -1;
          if (newY < 0 || newY > 100) element.speed.y *= -1;
          
          // Update rotation
          const rotationSpeed = 0.5;
          
          return {
            ...element,
            position: {
              x: Math.max(0, Math.min(100, newX)),
              y: Math.max(0, Math.min(100, newY))
            },
            speed: {x: element.speed.x, y: element.speed.y},
            rotation: element.rotation + rotationSpeed,
            // Glow intensity based on mouse proximity
            glowIntensity: Math.max(0.5, 1 - distance / 400)
          };
        })
      );
      
      animationFrameId = requestAnimationFrame(animate);
    };
    
    animationFrameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrameId);
  }, [mousePosition]);
  
  return (
    <div ref={containerRef} className="relative w-full h-96 bg-gray-900 overflow-hidden rounded-lg">
      {elements.map((element, index) => (
        <div
          key={index}
          className="absolute transform transition-transform duration-100"
          style={{
            left: `${element.position.x}%`,
            top: `${element.position.y}%`,
            transform: `translate(-50%, -50%) rotate(${element.rotation}deg)`,
            filter: `drop-shadow(0 0 ${10 * element.glowIntensity}px ${element.color})`,
            opacity: Math.min(1, 0.7 + element.glowIntensity * 0.3)
          }}
        >
          {/* All shapes are spheres */}
          <div 
            className="rounded-full border-2"
            style={{
              width: `${element.size}px`, 
              height: `${element.size}px`,
              borderColor: element.color,
              backgroundColor: `${element.color}20`
            }}
          />
          
          {/* IoT signal lines */}
          {index < elements.length - 1 && (
            <div 
              className="absolute pointer-events-none z-0"
              style={{
                width: '150px',
                height: '2px',
                backgroundColor: element.color,
                opacity: 0.3 * element.glowIntensity,
                left: '50%',
                top: '50%',
                transform: `rotate(${Math.atan2(
                  elements[(index + 1) % elements.length].position.y - element.position.y,
                  elements[(index + 1) % elements.length].position.x - element.position.x
                ) * 180 / Math.PI}deg)`,
                transformOrigin: 'left center',
                boxShadow: `0 0 5px ${element.color}`,
                width: `${Math.sqrt(
                  Math.pow(elements[(index + 1) % elements.length].position.x - element.position.x, 2) +
                  Math.pow(elements[(index + 1) % elements.length].position.y - element.position.y, 2)
                )}%`
              }}
            />
          )}
        </div>
      ))}
      
      {/* Pulse Effect */}
      {elements.map((element, index) => (
        <div 
          key={`pulse-${index}`}
          className="absolute rounded-full animate-ping"
          style={{
            left: `${element.position.x}%`,
            top: `${element.position.y}%`,
            width: `${element.size * 0.3}px`,
            height: `${element.size * 0.3}px`,
            backgroundColor: element.color,
            opacity: 0.2,
            transform: 'translate(-50%, -50%)'
          }}
        />
      ))}
      
      <div className="absolute bottom-4 left-4 text-gray-400 text-sm">
        Move your cursor to interact with IoT elements
      </div>
    </div>
  );
};

export default FloatingNeonElements;
