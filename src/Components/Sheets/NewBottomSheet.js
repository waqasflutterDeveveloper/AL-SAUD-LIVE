import * as React from 'react';
import {StyleSheet, Text, View, Button} from 'react-native';
import Animated from 'react-native-reanimated';
import BottomSheet from 'reanimated-bottom-sheet';
import SheetCard from '../Cards/SheetCard';
import {ScrollView} from 'react-native-gesture-handler';
export default function App({
  openModal,
  sheetRef,
  MaintainenceSelceted,
  handleCloseModal,
}) {
  const [open, setOpen] = React.useState(false);
  const handleOpenModal = () => {
    if (openModal) {
      sheetRef.current.snapTo(0);
    }
  };
  // React.useEffect(() => {
  //   sheetRef.current.snapTo(0);
  // }, []);
  const renderContent = () => (
    <View
      style={{
        backgroundColor: 'white',
        padding: 16,
        height: 450,
      }}>
      <SheetCard
        setOpen={setOpen}
        handleCloseModal={handleCloseModal}
        MaintainenceSelceted={MaintainenceSelceted}
      />
    </View>
  );

  return (
    <>
      {open && (
        <View
          style={{
            flex: 1,
            backgroundColor: 'grey',
            alignItems: 'center',
            justifyContent: 'center',
            opacity: 0.3,
          }}></View>
      )}

      <BottomSheet
        ref={sheetRef}
        onCloseEnd={() => setOpen(false)}
        onOpenEnd={() => setOpen(true)}
        initialSnap={2}
        snapPoints={[450, 300, 0]}
        borderRadius={10}
        renderContent={renderContent}
      />
    </>
  );
}
