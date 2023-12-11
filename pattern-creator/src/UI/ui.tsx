// ui.tsx
import React, { useState } from 'react';
import styles from './ui.module.css';

const UIComponent = () => {
    const [height, setHeight] = useState(10);
    const [width, setWidth] = useState(10);
    const [sectionName, setSectionName] = useState('');
    const [randRotation, setRandRotation] = useState(false);
  
    const handleCreate = () => {
      // eslint-disable-next-line no-restricted-globals
      parent.postMessage({
        pluginMessage: {
          type: 'create-pattern',
          height,
          width,
          randRotation,
          sectionName
        }
      }, '*');
    };
  
    const handleCancel = () => {
      // eslint-disable-next-line no-restricted-globals
      parent.postMessage({
        pluginMessage: {
          type: 'cancel'
        }
      }, '*');
    };

    return (
      <div className={styles.table}>
        <div className={styles.tableRow}>
          <div className={`${styles.input} ${styles.buttonGroup} ${styles.left}`}>
            <div className={styles.sectionTitle}>Height</div>
            <input 
              type="number" 
              className={styles.inputField} 
              value={height} 
              onChange={(e) => setHeight(parseInt(e.target.value))} 
              placeholder="Height" 
            />
          </div>

          <div className={`${styles.input} ${styles.buttonGroup} ${styles.right}`}>
            <div className={styles.sectionTitle}>Width</div>
            <input 
              type="number" 
              className={styles.inputField} 
              value={width} 
              onChange={(e) => setWidth(parseInt(e.target.value))} 
              placeholder="Width" 
            />
          </div>
        </div>

        <div className={styles.tableRow}>
          <div className={styles.divider}></div>
        </div>

        <div className={styles.tableRow}>
          <div className={styles.sectionTitle}>Element Label</div>
          <div className={`${styles.input} ${styles.buttonGroup} ${styles.left}`}>
            <input 
              type="input" 
              className={styles.inputField} 
              value={sectionName} 
              onChange={(e) => setSectionName(e.target.value)} 
              placeholder="Section Name" 
            />
          </div>

          <div className={`${styles.checkbox} ${styles.buttonGroup} ${styles.right}`}>
            <input 
              id="checkbox1" 
              type="checkbox" 
              className={styles.checkboxBox} 
              checked={randRotation} 
              onChange={() => setRandRotation(!randRotation)}
            />
            <label htmlFor="checkbox1" className={styles.checkboxLabel}>Random Rotation</label>
          </div>
        </div>

        <div className={styles.tableRow}>
          <button className={`${styles.button} ${styles.buttonPrimary}`} onClick={handleCreate}>Create</button>
          <button className={`${styles.button} ${styles.buttonSecondary}`} onClick={handleCancel}>Close</button>
        </div>
      </div>
    );
};

export default UIComponent;
