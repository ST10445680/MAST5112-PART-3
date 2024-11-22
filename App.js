import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, Button, TextInput, Alert, Image } from 'react-native';
import { Picker } from '@react-native-picker/picker'


// Menu Items Data
const initialMenuData = {
  Starters: [
    { name: 'Boerewors & Chakalaka Sliders', price: 50, description: 'Mini grilled boerewors patties served with spicy chakalaka relish on freshly baked buns.' },
    { name: 'Braaibroodjies', price: 40, description: 'Toasted sandwich with tomato, cheese, and onion, grilled on the braai and served with a smoky chutney dip.' },
    { name: 'Snoek Pâté with Freshly Baked Bread', price: 55, description: 'Creamy snoek pâté infused with herbs, served with slices of homemade bread.' },
    { name: 'Cape Malay Pickled Fish', price: 60, description: 'Fresh fish pickled in a sweet and tangy Cape Malay-style curry sauce, served cold.' },
    { name: 'Mogodu (Tripe) with Dumplings', price: 65, description: 'Traditional tripe cooked until tender, served with steamed dumplings.' },
    { name: 'Vetkoek with Mince Filling', price: 45, description: 'Golden-brown vetkoek filled with curried mince and a hint of spice.' },
  ],
  Mains: [
    { name: 'Potjiekos with Samp and Beans', price: 150, description: 'Hearty potjie stew with slow-cooked beef, vegetables, and aromatic herbs, served with a side of creamy samp and beans.' },
    { name: 'Umngqusho with Braised Lamb', price: 180, description: 'Xhosa-style samp and beans, cooked with butter, and served with tender braised lamb in a rich gravy.' },
    { name: 'Bunny Chow (Durban Style)', price: 85, description: 'A hollowed-out loaf of bread filled with your choice of spicy chicken, beef, or vegetable curry.' },
    { name: 'Traditional Shisa Nyama Platter', price: 220, description: 'A selection of grilled meats including boerewors, marinated lamb chops, and spicy chicken wings, served with pap, chakalaka, and green salad.' },
    { name: 'Oxtail Stew with Dumplings', price: 200, description: 'Slow-cooked oxtail in a red wine and herb sauce, served with soft, fluffy dumplings.' },
    { name: 'Pap & Wors with Sheba Sauce', price: 90, description: 'A classic combination of creamy pap and grilled boerewors, served with a rich tomato and onion sheba sauce.' },
    { name: 'Braai-Spiced Lamb Sosaties with Yellow Rice', price: 160, description: 'Skewers of marinated lamb, grilled to perfection and served with traditional yellow rice.' },
  ],
  Desserts: [
    { name: 'Malva Pudding with Amarula Cream Sauce', price: 65, description: 'A warm, sweet sponge pudding served with a creamy Amarula sauce.' },
    { name: 'Jan Ellis Pudding', price: 55, description: 'Classic South African dessert similar to malva pudding but with a unique caramel flavor, served with ice cream or custard.' },
    { name: 'Koeksisters', price: 35, description: 'Syrup-soaked twisted doughnuts with a crunchy exterior and soft inside.' },
    { name: 'Melktert (Milk Tart)', price: 40, description: 'Creamy milk tart with a hint of cinnamon, served with a dusting of powdered sugar.' },
    { name: 'Peppermint Crisp Tart', price: 50, description: 'Layers of tennis biscuits, caramel, and peppermint crisp, topped with whipped cream.' },
    { name: 'Traditional Malva & Melktert Duo', price: 75, description: 'A serving of both malva pudding and melktert for those who want to enjoy a bit of everything.' },
  ],
  Drinks: [
    { name: 'Homemade Ginger Beer (Gemmerbier)', price: 35, description: 'A refreshing, slightly spicy ginger beer made from scratch, served over ice with a slice of lemon.' },
    { name: 'Rooibos Iced Tea', price: 30, description: 'Brewed rooibos tea, served chilled with a touch of honey and fresh mint.' },
    { name: 'Mango Lassi with a Twist', price: 40, description: 'A creamy yogurt-based drink with fresh mango, cardamom, and a hint of rosewater for a refreshing tropical experience.' },
    { name: 'Amasi Smoothie', price: 45, description: 'A nutritious drink made from amasi (fermented milk) blended with banana and honey for a tangy, creamy treat.' },
    { name: 'Sorrel & Hibiscus Cooler', price: 35, description: 'A zesty sorrel and hibiscus-infused cooler with hints of lime and ginger.' },
    { name: 'Umqombothi Non-Alcoholic Brew', price: 50, description: 'A traditional African non-alcoholic beer made from maize and sorghum, served chilled.' },
    { name: 'Buchu & Citrus Spritzer', price: 30, description: 'A sparkling water spritzer infused with local buchu leaves and a splash of citrus for a crisp, refreshing taste.' },
    { name: 'Homemade Lemonade with a Rooibos Twist', price: 35, description: 'Freshly squeezed lemonade with a hint of rooibos tea, served over ice with mint.' },
  ],
  Alcoholic: [
    { name: 'Traditional Umqombothi (African Beer)', price: 60, description: 'A thick, rich traditional beer made from maize and sorghum, served in a calabash or clay pot for an authentic experience.' },
    { name: 'Cape Town Gin & Tonic', price: 80, description: 'Cape Town’s signature gin, served with tonic water and garnished with a slice of grapefruit and a sprig of rosemary.' },
    { name: 'Amarula Cream on Ice', price: 60, description: 'The iconic South African cream liqueur served over ice for a rich, smooth drink.' },
    { name: 'Castle Milk Stout', price: 45, description: 'A full-bodied, dark beer with creamy malt flavors and a touch of sweetness.' },
    { name: 'Spiced Pineapple Mojito', price: 90, description: 'A tropical twist on the classic mojito, made with spiced rum, fresh pineapple, mint, and lime.' },
    { name: 'Cape Winelands Chardonnay (Glass)', price: 70, description: 'A crisp Chardonnay with notes of citrus and oak, sourced from the Cape Winelands region.' },
    { name: 'Pinotage Sangria', price: 85, description: 'A South African take on sangria, made with local pinotage, fresh fruits, and a hint of brandy.' },
    { name: 'Springbok Shooter', price: 50, description: 'A popular South African shooter made with peppermint liqueur and Amarula, layered to perfection.' },
  ],
};

// Main App Component
const App = () => {
  const [menuData, setMenuData] = useState(initialMenuData); // Store the menu data in state
  const [selectedCourse, setSelectedCourse] = useState('Starters');
  const [showMenu, setShowMenu] = useState(false);
  const [showAddItem, setShowAddItem] = useState(false);
  const [newItemName, setNewItemName] = useState('');
  const [newItemDescription, setNewItemDescription] = useState('');
  const [newItemPrice, setNewItemPrice] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);
  const [showWelcome, setShowWelcome] = useState(true);
  
  // Calculate average price for each course
  const calculateAveragePrice = (course) => {
    const total = menuData[course].reduce((sum, item) => sum + item.price, 0);
    return (total / menuData[course].length).toFixed(2);
  };

  // Get item count for each course
  const getItemCount = (course) => {
    return menuData[course].length;
  };

  // Delete a menu item
  const deleteMenuItem = (index) => {
    const updatedMenuData = { ...menuData };
    updatedMenuData[selectedCourse].splice(index, 1); // Remove item at the specified index
    setMenuData(updatedMenuData); // Update the menu data in state
  };

  // Add a new menu item
  const addMenuItem = () => {
    if (newItemName && newItemDescription && newItemPrice) {
      const newItem = {
        name: newItemName,
        description: newItemDescription,
        price: parseFloat(newItemPrice), // Convert price to a number
      };
      const updatedMenuData = { ...menuData }; // Create a copy of the current menu data

      if (isEditing) {
        updatedMenuData[selectedCourse][editingIndex] = newItem; // Update the existing item
      } else {
        updatedMenuData[selectedCourse].push(newItem); // Add the new item to the selected course
      }

      setMenuData(updatedMenuData); // Update the menu data in state
      clearForm(); // Clear input fields after adding/updating
    } else {
      Alert.alert('Please fill in all fields.'); // Alert if any field is empty
    }
  };

  // Clear form fields
  const clearForm = () => {
    setNewItemName('');
    setNewItemDescription('');
    setNewItemPrice('');
    setIsEditing(false);
    setEditingIndex(null);
    setShowAddItem(false);
  };

  // Edit an existing menu item
  const editMenuItem = (index) => {
    const itemToEdit = menuData[selectedCourse][index];
    setNewItemName(itemToEdit.name);
    setNewItemDescription(itemToEdit.description);
    setNewItemPrice(itemToEdit.price.toString());
    setIsEditing(true);
    setEditingIndex(index);
    setShowAddItem(true);
  };

  return (
    <View style={styles.container}>
      {showWelcome && (
        <View style={styles.welcomeContainer}>
       
          <Text style={styles.welcomeText}>Welcome to Heritage Harvest!</Text>
          <Image style={styles. ImageSize}
            source={require('./Images/HeritageHarvestLogo.jpg' )} />
          <Button title="Get Started" onPress={() => setShowWelcome(false)} />
        </View>
      )}
      {!showWelcome && (
        <>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={selectedCourse}
              onValueChange={(itemValue) => setSelectedCourse(itemValue)}
              style={styles.picker}
            >
              {Object.keys(menuData).map((course) => (
                <Picker.Item key={course} label={course} value={course} />
              ))}
            </Picker>
          </View>
          <Button title={showAddItem ? 'Cancel' : 'Add Menu Item'} onPress={() => setShowAddItem(!showAddItem)} />
          {showAddItem && (
            <View style={styles.formContainer}>
              <TextInput
                placeholder="Item Name"
                value={newItemName}
                onChangeText={setNewItemName}
                style={styles.input}
              />
              <TextInput
                placeholder="Description"
                value={newItemDescription}
                onChangeText={setNewItemDescription}
                style={styles.input}
              />
              <TextInput
                placeholder="Price"
                value={newItemPrice}
                onChangeText={setNewItemPrice}
                keyboardType="numeric"
                style={styles.input}
              />
              <Button title={isEditing ? 'Update Item' : 'Add Item'} onPress={addMenuItem} />
            </View>
          )}
          {showMenu && (
            <>
              <Text style={styles.sectionTitle}>Menu Items for {selectedCourse}</Text>
              <FlatList
                data={menuData[selectedCourse]}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item, index }) => (
                  <View style={styles.menuItem}>
                    <Text style={styles.menuItemName}>{item.name}</Text>
                    <Text style={styles.menuItemDescription}>{item.description}</Text>
                    <Text style={styles.menuItemPrice}>R{item.price}</Text>
                    <Button title="Edit" onPress={() => editMenuItem(index)} />
                    <Button title="Delete" onPress={() => deleteMenuItem(index)} />
                  </View>
                )}
              />
              <Text style={styles.averageText}>Average Price: R{calculateAveragePrice(selectedCourse)}</Text>
              <Text style={styles.itemCountText}>Total Items: {getItemCount(selectedCourse)}</Text>
            </>
          )}
          <Button title={showMenu ? 'Hide Menu' : 'Show Menu'} onPress={() => setShowMenu(!showMenu)} />
        </>
      )}
    </View>
  );
};



// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },

    Image: {width: '50%', 
    height: 'auto', 
    marginBottom: '2px'
  },
    
 
  welcomeContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  welcomeText: {
    fontSize: 24,
    marginBottom: 20,
  },
  pickerContainer: {
    marginBottom: 20,
  },
  picker: {
    height: 50,
    width: '100%',
  },
  formContainer: {
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 8,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  menuItem: {
    padding: 10,
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
  },
  menuItemName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  menuItemDescription: {
    fontSize: 14,
    color: 'gray',
  },
  menuItemPrice: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  averageText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  itemCountText: {
    fontSize: 16,
    marginBottom: 10,
  },
});

export default App;
