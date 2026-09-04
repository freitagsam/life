import { useMemo, useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const COLORS = {
  paper: '#F5F0E6',
  paperDark: '#E9E0D1',
  ink: '#17243D',
  muted: '#6C7180',
  blue: '#315C8C',
  green: '#3E8061',
  orange: '#D36B3D',
  gold: '#D9A441',
  white: '#FFFDF8',
  line: '#D7CDBE',
  red: '#B54B4B',
};

const tabs = [
  { key: 'career', label: 'Career', icon: '💼' },
  { key: 'assets', label: 'Assets', icon: '🔑' },
  { key: 'life', label: 'Life', icon: '📖' },
  { key: 'people', label: 'People', icon: '👥' },
  { key: 'activities', label: 'Activities', icon: '⚡' },
];

const careerItems = [
  { icon: '🥒', title: 'Pickleball Pro', note: 'Train, enter tournaments, find sponsors', tag: 'SPORT' },
  { icon: '📱', title: 'Influencer', note: 'Choose a niche, post content, build a following', tag: 'CREATOR' },
  { icon: '🏢', title: 'Regular Jobs', note: 'Browse full-time openings and interviews', tag: 'WORK' },
  { icon: '🎓', title: 'Education', note: 'University, trade school, certificates', tag: 'LEARN' },
  { icon: '🚀', title: 'Start a Business', note: 'Build a company from a small idea', tag: 'BOSS' },
  { icon: '🎭', title: 'Special Careers', note: 'Athlete, actor, musician, politician and more', tag: 'RARE' },
];

const assetItems = [
  { icon: '💵', title: 'Cash', note: '$1,240 available', value: '$1,240' },
  { icon: '🚙', title: 'Vehicles', note: 'Nothing owned yet', value: '0' },
  { icon: '🏠', title: 'Property', note: 'Nothing owned yet', value: '0' },
  { icon: '📈', title: 'Investments', note: 'Stocks, funds and crypto', value: '—' },
];

const peopleItems = [
  { icon: '👩🏽', title: 'Mom', note: 'Relationship: Excellent', value: '92%' },
  { icon: '👨🏽', title: 'Dad', note: 'Relationship: Good', value: '81%' },
  { icon: '🧑🏻', title: 'Jordan Miles', note: 'Best friend', value: '88%' },
  { icon: '💘', title: 'Dating', note: 'Meet somebody new', value: 'Single' },
];

const activityItems = [
  { icon: '🏋️', title: 'Mind & Body', note: 'Gym, meditation, reading and appearance' },
  { icon: '🎉', title: 'Going Out', note: 'Restaurants, nightlife, trips and events' },
  { icon: '❤️', title: 'Love', note: 'Dates, dating apps and relationships' },
  { icon: '🛍️', title: 'Shopping', note: 'Cars, homes, gifts and useful things' },
  { icon: '🎲', title: 'Risk & Luck', note: 'Lottery, casino and other questionable ideas' },
  { icon: '✈️', title: 'Travel', note: 'Vacation, move cities or emigrate' },
];

const startingEvents = [
  {
    age: 18,
    text: 'You graduated from Northside High School. Your family celebrated with grocery-store cake.',
    icon: '🎓',
  },
  {
    age: 18,
    text: 'Your best friend Jordan wants to take a spontaneous beach trip this weekend.',
    icon: '🌊',
  },
  {
    age: 17,
    text: 'You won a local pickleball doubles tournament and started wondering how far you could take it.',
    icon: '🏆',
  },
  {
    age: 16,
    text: 'A video you posted reached 42,000 views. You gained 1,870 followers overnight.',
    icon: '📱',
  },
];

const yearlyEvents = [
  'You worked on your backhand and won a close tournament match.',
  'A small clothing brand offered you a sponsored social media post.',
  'You met somebody interesting while waiting in line for coffee.',
  'You saved some money, then immediately found three things you wanted to buy.',
  'An old friend reached out with a strange but promising business idea.',
  'You took a short trip and came home with a better story than souvenir.',
];

function StatBar({ label, value, color }) {
  return (
    <View style={styles.statItem}>
      <View style={styles.statTop}>
        <Text style={styles.statLabel}>{label}</Text>
        <Text style={styles.statValue}>{value}%</Text>
      </View>
      <View style={styles.statTrack}>
        <View style={[styles.statFill, { width: `${value}%`, backgroundColor: color }]} />
      </View>
    </View>
  );
}

function SectionTitle({ eyebrow, title, subtitle }) {
  return (
    <View style={styles.sectionHeading}>
      <Text style={styles.sectionEyebrow}>{eyebrow}</Text>
      <Text style={styles.sectionTitle}>{title}</Text>
      {subtitle ? <Text style={styles.sectionSubtitle}>{subtitle}</Text> : null}
    </View>
  );
}

function MenuRow({ item, onPress }) {
  return (
    <TouchableOpacity activeOpacity={0.7} style={styles.menuRow} onPress={onPress}>
      <View style={styles.menuIcon}>
        <Text style={styles.menuEmoji}>{item.icon}</Text>
      </View>
      <View style={styles.menuCopy}>
        <View style={styles.menuTitleLine}>
          <Text style={styles.menuTitle}>{item.title}</Text>
          {item.tag ? <Text style={styles.menuTag}>{item.tag}</Text> : null}
        </View>
        <Text style={styles.menuNote}>{item.note}</Text>
      </View>
      {item.value ? <Text style={styles.menuValue}>{item.value}</Text> : <Text style={styles.chevron}>›</Text>}
    </TouchableOpacity>
  );
}

export default function App() {
  const [activeTab, setActiveTab] = useState('life');
  const [age, setAge] = useState(18);
  const [events, setEvents] = useState(startingEvents);
  const [toast, setToast] = useState('');

  const money = useMemo(() => 1240 + Math.max(age - 18, 0) * 725, [age]);

  const ageUp = () => {
    const nextAge = age + 1;
    const nextText = yearlyEvents[(nextAge - 19) % yearlyEvents.length];
    setAge(nextAge);
    setEvents((current) => [{ age: nextAge, text: nextText, icon: '✨' }, ...current]);
    setToast(`Welcome to age ${nextAge}.`);
    setActiveTab('life');
  };

  const showSoon = (label) => {
    setToast(`${label} is mapped out and coming next.`);
  };

  const renderLife = () => (
    <>
      <View style={styles.profileCard}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>SF</Text>
        </View>
        <View style={styles.profileCopy}>
          <Text style={styles.name}>Sam Foster</Text>
          <Text style={styles.profileLine}>Age {age} · Gainesville, Florida</Text>
          <Text style={styles.profileLine}>Aspiring creator · Single</Text>
        </View>
        <View style={styles.balance}>
          <Text style={styles.balanceLabel}>BALANCE</Text>
          <Text style={styles.balanceValue}>${money.toLocaleString()}</Text>
        </View>
      </View>

      <View style={styles.statsCard}>
        <StatBar label="Mood" value={86} color={COLORS.gold} />
        <StatBar label="Health" value={91} color={COLORS.green} />
        <StatBar label="Smarts" value={74} color={COLORS.blue} />
        <StatBar label="Confidence" value={68} color={COLORS.orange} />
      </View>

      <View style={styles.feedHeader}>
        <View>
          <Text style={styles.feedEyebrow}>YOUR STORY</Text>
          <Text style={styles.feedTitle}>The Life Log</Text>
        </View>
        <Text style={styles.feedCount}>{events.length} moments</Text>
      </View>

      <View style={styles.timeline}>
        {events.map((event, index) => (
          <View key={`${event.age}-${index}`} style={styles.eventRow}>
            <View style={styles.ageColumn}>
              <Text style={styles.ageSmall}>AGE</Text>
              <Text style={styles.ageNumber}>{event.age}</Text>
            </View>
            <View style={styles.timelineRail}>
              <View style={[styles.timelineDot, index === 0 && styles.timelineDotCurrent]} />
              {index < events.length - 1 ? <View style={styles.timelineLine} /> : null}
            </View>
            <View style={styles.eventCard}>
              <Text style={styles.eventIcon}>{event.icon}</Text>
              <Text style={styles.eventText}>{event.text}</Text>
            </View>
          </View>
        ))}
      </View>
    </>
  );

  const screens = {
    career: {
      eyebrow: 'MAKE A LIVING',
      title: 'Career',
      subtitle: 'Follow the safe route or try becoming somebody people remember.',
      items: careerItems,
    },
    assets: {
      eyebrow: 'WHAT YOU OWN',
      title: 'Assets',
      subtitle: 'Build wealth, collect things and occasionally make a terrible purchase.',
      items: assetItems,
    },
    people: {
      eyebrow: 'YOUR CIRCLE',
      title: 'Relationships',
      subtitle: 'The people in your life remember how you treat them.',
      items: peopleItems,
    },
    activities: {
      eyebrow: 'DO SOMETHING',
      title: 'Activities',
      subtitle: 'Small decisions, questionable plans and potentially great stories.',
      items: activityItems,
    },
  };

  const renderMenuScreen = () => {
    const screen = screens[activeTab];
    return (
      <>
        <SectionTitle eyebrow={screen.eyebrow} title={screen.title} subtitle={screen.subtitle} />
        <View style={styles.listCard}>
          {screen.items.map((item) => (
            <MenuRow key={item.title} item={item} onPress={() => showSoon(item.title)} />
          ))}
        </View>
        {activeTab === 'career' ? (
          <View style={styles.ideaCard}>
            <Text style={styles.ideaStamp}>CAREER SYSTEM IDEA</Text>
            <Text style={styles.ideaTitle}>Jobs should feel playable.</Text>
            <Text style={styles.ideaText}>
              Pickleball pros will train, enter tours, gain rankings and earn sponsors. Influencers will choose platforms,
              make content, handle scandals and turn attention into a real career.
            </Text>
          </View>
        ) : null}
      </>
    );
  };

  return (
    <SafeAreaView style={styles.app}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.ink} />
      <View style={styles.topBar}>
        <View>
          <Text style={styles.logo}>ONE LIFE</Text>
          <Text style={styles.logoSub}>a story you get to ruin—or improve</Text>
        </View>
        <TouchableOpacity style={styles.menuButton} onPress={() => showSoon('Main menu')}>
          <Text style={styles.menuButtonText}>☰</Text>
        </TouchableOpacity>
      </View>

      {toast ? (
        <TouchableOpacity style={styles.toast} onPress={() => setToast('')}>
          <Text style={styles.toastText}>{toast}</Text>
          <Text style={styles.toastClose}>×</Text>
        </TouchableOpacity>
      ) : null}

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {activeTab === 'life' ? renderLife() : renderMenuScreen()}
      </ScrollView>

      <View style={styles.bottomBar}>
        {tabs.map((tab) => {
          const selected = activeTab === tab.key;
          if (tab.key === 'life') {
            return (
              <TouchableOpacity
                key={tab.key}
                activeOpacity={0.75}
                style={styles.ageButtonWrap}
                onPress={ageUp}
              >
                <View style={styles.ageButton}>
                  <Text style={styles.agePlus}>+</Text>
                </View>
                <Text style={styles.ageButtonLabel}>AGE UP</Text>
              </TouchableOpacity>
            );
          }

          return (
            <TouchableOpacity
              key={tab.key}
              activeOpacity={0.7}
              style={styles.navItem}
              onPress={() => setActiveTab(tab.key)}
            >
              <Text style={[styles.navIcon, selected && styles.navIconSelected]}>{tab.icon}</Text>
              <Text style={[styles.navLabel, selected && styles.navLabelSelected]}>{tab.label}</Text>
              {selected ? <View style={styles.navMarker} /> : null}
            </TouchableOpacity>
          );
        })}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  app: {
    flex: 1,
    backgroundColor: COLORS.paper,
  },
  topBar: {
    alignItems: 'center',
    backgroundColor: COLORS.ink,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 18,
    paddingBottom: 14,
    paddingTop: 10,
  },
  logo: {
    color: COLORS.white,
    fontSize: 24,
    fontWeight: '900',
    letterSpacing: 1.5,
  },
  logoSub: {
    color: '#AAB3C2',
    fontSize: 11,
    marginTop: 1,
  },
  menuButton: {
    alignItems: 'center',
    borderColor: '#3A465B',
    borderRadius: 10,
    borderWidth: 1,
    height: 38,
    justifyContent: 'center',
    width: 42,
  },
  menuButtonText: {
    color: COLORS.white,
    fontSize: 21,
  },
  toast: {
    alignItems: 'center',
    backgroundColor: '#FFF3C8',
    borderBottomColor: '#D6BE6C',
    borderBottomWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 18,
    paddingVertical: 10,
  },
  toastText: {
    color: '#65501F',
    flex: 1,
    fontSize: 13,
    fontWeight: '600',
  },
  toastClose: {
    color: '#80692E',
    fontSize: 20,
    marginLeft: 12,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    padding: 14,
    paddingBottom: 28,
  },
  profileCard: {
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderColor: COLORS.line,
    borderRadius: 15,
    borderWidth: 1,
    flexDirection: 'row',
    padding: 14,
  },
  avatar: {
    alignItems: 'center',
    backgroundColor: COLORS.orange,
    borderRadius: 25,
    height: 50,
    justifyContent: 'center',
    marginRight: 11,
    transform: [{ rotate: '-2deg' }],
    width: 50,
  },
  avatarText: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: '900',
  },
  profileCopy: {
    flex: 1,
  },
  name: {
    color: COLORS.ink,
    fontSize: 18,
    fontWeight: '900',
  },
  profileLine: {
    color: COLORS.muted,
    fontSize: 11,
    lineHeight: 16,
  },
  balance: {
    alignItems: 'flex-end',
    marginLeft: 8,
  },
  balanceLabel: {
    color: COLORS.muted,
    fontSize: 8,
    fontWeight: '800',
    letterSpacing: 1,
  },
  balanceValue: {
    color: COLORS.green,
    fontSize: 16,
    fontWeight: '900',
    marginTop: 2,
  },
  statsCard: {
    backgroundColor: COLORS.ink,
    borderRadius: 15,
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 10,
    padding: 11,
  },
  statItem: {
    paddingHorizontal: 6,
    paddingVertical: 5,
    width: '50%',
  },
  statTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  statLabel: {
    color: '#D6DBE4',
    fontSize: 10,
    fontWeight: '700',
  },
  statValue: {
    color: COLORS.white,
    fontSize: 10,
    fontWeight: '800',
  },
  statTrack: {
    backgroundColor: '#344057',
    borderRadius: 4,
    height: 6,
    overflow: 'hidden',
  },
  statFill: {
    borderRadius: 4,
    height: '100%',
  },
  feedHeader: {
    alignItems: 'flex-end',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 11,
    marginTop: 24,
    paddingHorizontal: 3,
  },
  feedEyebrow: {
    color: COLORS.orange,
    fontSize: 10,
    fontWeight: '900',
    letterSpacing: 1.3,
  },
  feedTitle: {
    color: COLORS.ink,
    fontSize: 25,
    fontWeight: '900',
  },
  feedCount: {
    color: COLORS.muted,
    fontSize: 11,
    marginBottom: 4,
  },
  timeline: {
    paddingBottom: 8,
  },
  eventRow: {
    alignItems: 'stretch',
    flexDirection: 'row',
    minHeight: 96,
  },
  ageColumn: {
    alignItems: 'center',
    paddingTop: 12,
    width: 39,
  },
  ageSmall: {
    color: COLORS.muted,
    fontSize: 7,
    fontWeight: '800',
    letterSpacing: 0.8,
  },
  ageNumber: {
    color: COLORS.ink,
    fontSize: 18,
    fontWeight: '900',
  },
  timelineRail: {
    alignItems: 'center',
    width: 20,
  },
  timelineDot: {
    backgroundColor: COLORS.paper,
    borderColor: COLORS.blue,
    borderRadius: 7,
    borderWidth: 3,
    height: 14,
    marginTop: 18,
    width: 14,
    zIndex: 2,
  },
  timelineDotCurrent: {
    backgroundColor: COLORS.orange,
    borderColor: COLORS.orange,
  },
  timelineLine: {
    backgroundColor: '#C7BBA9',
    flex: 1,
    marginBottom: -18,
    width: 2,
  },
  eventCard: {
    backgroundColor: COLORS.white,
    borderColor: COLORS.line,
    borderRadius: 12,
    borderWidth: 1,
    flex: 1,
    flexDirection: 'row',
    marginBottom: 9,
    marginLeft: 4,
    padding: 13,
  },
  eventIcon: {
    fontSize: 20,
    marginRight: 10,
  },
  eventText: {
    color: '#303747',
    flex: 1,
    fontSize: 13,
    lineHeight: 19,
  },
  sectionHeading: {
    paddingHorizontal: 4,
    paddingBottom: 18,
    paddingTop: 8,
  },
  sectionEyebrow: {
    color: COLORS.orange,
    fontSize: 10,
    fontWeight: '900',
    letterSpacing: 1.4,
  },
  sectionTitle: {
    color: COLORS.ink,
    fontSize: 32,
    fontWeight: '900',
    marginTop: 2,
  },
  sectionSubtitle: {
    color: COLORS.muted,
    fontSize: 14,
    lineHeight: 20,
    marginTop: 5,
    maxWidth: 340,
  },
  listCard: {
    backgroundColor: COLORS.white,
    borderColor: COLORS.line,
    borderRadius: 15,
    borderWidth: 1,
    overflow: 'hidden',
  },
  menuRow: {
    alignItems: 'center',
    borderBottomColor: '#E6DED1',
    borderBottomWidth: 1,
    flexDirection: 'row',
    minHeight: 73,
    paddingHorizontal: 12,
    paddingVertical: 9,
  },
  menuIcon: {
    alignItems: 'center',
    backgroundColor: '#EEE7DB',
    borderRadius: 12,
    height: 45,
    justifyContent: 'center',
    marginRight: 11,
    width: 45,
  },
  menuEmoji: {
    fontSize: 23,
  },
  menuCopy: {
    flex: 1,
  },
  menuTitleLine: {
    alignItems: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  menuTitle: {
    color: COLORS.ink,
    fontSize: 15,
    fontWeight: '800',
    marginRight: 7,
  },
  menuTag: {
    backgroundColor: '#DFE7F0',
    borderRadius: 4,
    color: COLORS.blue,
    fontSize: 7,
    fontWeight: '900',
    letterSpacing: 0.7,
    overflow: 'hidden',
    paddingHorizontal: 5,
    paddingVertical: 3,
  },
  menuNote: {
    color: COLORS.muted,
    fontSize: 11,
    lineHeight: 16,
    marginTop: 2,
  },
  menuValue: {
    color: COLORS.green,
    fontSize: 12,
    fontWeight: '800',
    marginLeft: 8,
  },
  chevron: {
    color: '#9D9588',
    fontSize: 27,
    marginLeft: 8,
  },
  ideaCard: {
    backgroundColor: '#E7E1D5',
    borderColor: '#BEB3A2',
    borderRadius: 12,
    borderStyle: 'dashed',
    borderWidth: 1,
    marginTop: 14,
    padding: 16,
    transform: [{ rotate: '-0.35deg' }],
  },
  ideaStamp: {
    color: COLORS.orange,
    fontSize: 9,
    fontWeight: '900',
    letterSpacing: 1.2,
  },
  ideaTitle: {
    color: COLORS.ink,
    fontSize: 18,
    fontWeight: '900',
    marginTop: 4,
  },
  ideaText: {
    color: '#535663',
    fontSize: 12,
    lineHeight: 18,
    marginTop: 5,
  },
  bottomBar: {
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderTopColor: COLORS.line,
    borderTopWidth: 1,
    flexDirection: 'row',
    minHeight: 76,
    paddingBottom: 5,
    paddingHorizontal: 4,
  },
  navItem: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    minHeight: 63,
    paddingTop: 6,
  },
  navIcon: {
    fontSize: 20,
    opacity: 0.62,
  },
  navIconSelected: {
    opacity: 1,
  },
  navLabel: {
    color: COLORS.muted,
    fontSize: 9,
    fontWeight: '700',
    marginTop: 3,
  },
  navLabelSelected: {
    color: COLORS.blue,
    fontWeight: '900',
  },
  navMarker: {
    backgroundColor: COLORS.orange,
    borderRadius: 3,
    height: 3,
    marginTop: 4,
    width: 18,
  },
  ageButtonWrap: {
    alignItems: 'center',
    flex: 1,
    marginTop: -23,
  },
  ageButton: {
    alignItems: 'center',
    backgroundColor: COLORS.green,
    borderColor: COLORS.white,
    borderRadius: 28,
    borderWidth: 4,
    height: 56,
    justifyContent: 'center',
    shadowColor: '#18251E',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.22,
    shadowRadius: 4,
    width: 56,
  },
  agePlus: {
    color: COLORS.white,
    fontSize: 34,
    fontWeight: '500',
    lineHeight: 36,
  },
  ageButtonLabel: {
    color: COLORS.green,
    fontSize: 8,
    fontWeight: '900',
    letterSpacing: 0.6,
    marginTop: 1,
  },
});
