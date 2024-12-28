# Product Requirements Document (PRD)

## Gun Club Scoring Web Application

---

### **Version 1.0**

**Last Updated:** April 27, 2024  
**Author:** StackBlitz Team

---

## Table of Contents

1. [Objective](#objective)
2. [Background](#background)
3. [Scope](#scope)
4. [Definitions and Acronyms](#definitions-and-acronyms)
5. [Core Features](#core-features)
6. [Technical Requirements](#technical-requirements)
7. [Non-Functional Requirements](#non-functional-requirements)
8. [User Stories](#user-stories)
9. [Wireframes and UI Mockups](#wireframes-and-ui-mockups)
10. [Roadmap](#roadmap)
11. [Dependencies](#dependencies)
12. [Assumptions](#assumptions)
13. [Constraints](#constraints)
14. [Acceptance Criteria](#acceptance-criteria)
15. [Appendix](#appendix)

---

## Objective

Develop a modern, responsive web application for a gun club to efficiently track shooters' scores, handicaps, and statistics across various shooting disciplines.

---

## Background

Gun clubs require reliable systems to manage and analyze shooters' performance data. Traditional methods using spreadsheets or manual record-keeping are prone to errors and inefficiencies. A dedicated web application will streamline score tracking, provide insightful statistics, and enhance the overall management of club activities.

---

## Scope

**In Scope:**
- Development of a web-based application accessible via desktop and mobile browsers
- Implementation of core features related to game scoring, shooter management, and statistical reporting
- Integration with Clerk for authentication
- Responsive and intuitive user interface design

**Out of Scope:**
- Mobile application development
- Offline functionality
- External system integrations
- Advanced analytics beyond specified statistics

## Overview
Gun Club Scorer is a web application designed to help shooting clubs and their members track scores, manage competitions, and analyze performance across different shooting disciplines.

## Target Users
- Product Administrators (@oneuprising.com)
- Club Administrators
- Club Members (Users)

## Core Features

### 1. Role-Based Access Control

**Product Administrator**
- Universal read/write access across all clubs
- Ability to switch between different clubs
- Can add/delete/edit Club Administrators and Users
- Must have @oneuprising.com email address

**Club Administrator**
- Manages a single club account
- Can add, delete, and edit Users within their club
- Future: Will handle club billing (not implemented in initial release)
- Full access to club statistics and reporting

**User**
- Can manage their own user profile
- Can enter new scores for themselves
- Cannot edit or delete scores once entered
- Can delete their own account
- Can view their personal statistics

### 2. Score Tracking
#### Score Entry
- Support for multiple shooting disciplines:
  - Skeet (25 shots)
  - Doubles Skeet (25 shots)
  - Trap (25 shots)
  - 5-Stand (25 shots)
- Gun Configuration Integration:
  - Select from saved gun configurations
  - Automatically filters guns by selected gauge
  - Primary gun auto-selected when gauge matches
- Bird-by-bird score recording:
  - Visual station layout showing current position
  - Hit/Miss buttons for each shot
  - Option shot tracking for Skeet
  - Starting station selection for Trap and 5-Stand
  - Starting station remains visible during scoring
  - Progress indicator showing shots remaining
  - Undo functionality for correcting mistakes

#### Score Display
- List view of recent scores showing:
  - Date and time
  - Game type
  - Gauge used
  - Starting station (for Trap and 5-Stand)
  - Total score
  - Visual representation of hits/misses
- Filtering and search capabilities
- Score details view with:
  - Shot-by-shot breakdown
  - Station performance analysis
  - Notes and conditions

#### Score Data
- Required fields:
  - Game type
  - Gauge
  - Date/time
  - Individual bird results
  - Total score
  - Shooter ID
- Optional fields:
  - Starting station (Trap/5-Stand)
  - Weather conditions
  - Notes

### 3. My Guns
#### Gun Management
- Add, edit, and delete personal guns
- Set primary gun configuration
- Primary gun auto-selected during score entry
- Required gun attributes:
  - Name (for identification)
  - Brand (from predefined list or custom entry)
  - Gauge (12, 20, 28, .410)

#### Optional Gun Details
- Choke Options:
  - Cylinder (Cyl): No constriction; widest spread
  - Skeet (Skt): Slightly tighter than Cylinder
  - Improved Cylinder (IC): Mild constriction
  - Light Modified (LM): Between IC and Modified
  - Modified (Mod): Medium constriction
  - Improved Modified (IM): Tighter than Modified
  - Full (F): High constriction
  - Extra Full (XF/SF): Extreme constriction
- Model (from predefined list based on brand or custom entry)
- Physical characteristics:
  - Barrel length (18-36 inches)
  - Action type (Break Action, Semi-Auto, Pump, Bolt Action, Lever Action)
  - Stock type (Standard, Pistol Grip, Adjustable)
  - Stock material (Wood, Synthetic)
  - Weight
  - Sights (Bead, Ribbed, Red Dot, Scope)
  - Finish (Blued, Stainless, Camo)
- Notes field for additional information

#### Gun Selection
- Predefined list of major brands:
  - Remington
  - Mossberg
  - Beretta
  - Benelli
  - Browning
  - Winchester
  - CZ-USA
  - Stoeger
  - Savage Arms
  - Franchi
- Dynamic model selection based on chosen brand
- Option to add custom brands and models
- Quick selection of primary gun during score entry
- Dynamic model selection based on chosen brand
- Option to add custom brands and models

#### Gun Display
- Card-based layout showing:
  - Gun name and brand
  - Basic specifications
  - Key attributes
  - Custom notes
  - Primary gun indicator
  - Quick actions for edit/delete/set primary
- Search and filter capabilities
- Quick access to frequently used guns

### 3. User Management
- User authentication and authorization
- Role-based permissions enforcement
- User profiles with shooting preferences
- Handicap tracking
- Performance history

### 4. Statistics and Analytics
- Individual shooter statistics
  - Average scores by game type
  - Performance by gun
  - Improvement trends
  - Streak tracking
- Club-wide statistics
  - Overall averages
  - Top performers
  - Most active shooters

### 5. Dashboard Features
#### Organization Leaderboard
- Comprehensive view of shooter achievements
- Hierarchical organization:
  - Game type sections with clear headers
  - Gauge subsections within each game
  - Individual shooter entries with achievements
- Filterable by:
  - Game type (Skeet, Doubles Skeet, Trap, 5-Stand)
  - Gauge (12, 20, 28, .410)
  - All games/gauges combined view
- Filter behavior:
  - Synchronized game and gauge filters
  - Empty sections automatically hidden
  - Clear visual feedback for active filters
- Display metrics:
  - Number of straights (perfect rounds) in large purple numbers
  - Longest streak
  - Shooter name and achievements
- Sorting:
  - Primary organization by game type (Skeet, Doubles Skeet, Trap, 5-Stand)
  - Secondary organization by gauge (12, 20, 28, .410)
  - Primary sort by longest streak
  - Secondary sort by number of straights
- Visual elements:
  - Trophy/medal icons for top performers
  - Prominent display of achievement numbers
  - Interactive filters with clear visual feedback
  - Hover states for enhanced user interaction
  - Clear section headers and gauge labels
  - Consistent spacing and typography
  - Responsive layout adapting to filter selections

#### Quick Stats
- Total shooters
- Recent games
- Straights today
- Club average

### 4. Competition Management
- Create and manage competitions
- Track scores in real-time
- Generate leaderboards
- Support for different competition formats

## Technical Requirements

### Authentication
- Secure user authentication via Clerk
- Role-based access control
- Protected API endpoints with session validation
- Secure token management

### Data Storage
- Secure storage of user data
- Score history persistence
- Real-time updates

### Performance
- Fast score entry interface
- Responsive design for mobile use
- Efficient data loading and caching

### Security
- Data encryption
- Secure API endpoints
- Input validation and sanitization
- Error handling and logging
- Regular security updates

## Non-Functional Requirements

### Performance
- Page load times under 2 seconds
- Smooth real-time updates
- Efficient data aggregation for statistics
- Efficient data operations

### Security
- HTTPS encryption
- Secure session management
- Data backup and recovery

### Usability
- Intuitive interface design
- Mobile-responsive layout
- Clear visual hierarchy for statistics
- Interactive filtering capabilities
- Accessibility compliance

### Scalability
- Support for growing user base
- Efficient resource utilization
- Modular architecture

## User Stories

1. **As a Product Administrator,** I want to:
   - Switch between different clubs to manage their settings
   - Add or remove Club Administrators
   - Access all system features and data

2. **As a Club Administrator,** I want to:
   - Manage my club's user roster
   - View club-wide statistics and reports
   - Configure club-specific settings

3. **As a User,** I want to:
   - Enter my shooting scores accurately
   - View my performance statistics
   - Manage my profile information
   - Delete my account if needed

## Wireframes and UI Mockups

Key screens include:
1. Dashboard
2. Score Entry
3. Shooter Management
4. Statistics and Reports
5. User Profile

## Future Enhancements
1. Mobile application
2. Offline support
3. Integration with shooting club management systems
4. Advanced analytics and reporting
5. Social features and shooter networking
6. Competition scheduling and registration

## Success Metrics
- User adoption rate
- Score entry frequency
- User engagement metrics
- System performance metrics
- User satisfaction scores

## Release Strategy
1. MVP Release
   - Basic score tracking
   - Clerk authentication integration
   - Core statistics
   - Essential UI components

2. Phase 2
   - Competition management
   - Advanced statistics
   - Social features

3. Phase 3
   - Mobile app
   - Offline support
   - Advanced analytics

## Dependencies
- React and related libraries
- Clerk Authentication
- Node.js runtime
- Development tools and IDE support

## Assumptions
- Users have modern web browsers
- Stable internet connection
- Basic technical proficiency

## Constraints
- Development timeline
- Technical complexity
- Resource availability

## Acceptance Criteria

1. **Core Functionality**
   - Score tracking works accurately
   - User authentication is secure
   - Statistics calculate correctly

2. **Performance**
   - Meets load time requirements
   - Handles concurrent users
   - Maintains data integrity

3. **User Experience**
   - Intuitive navigation
   - Responsive design
   - Clear error handling

## Appendix

### Data Structures

```json
{
  "gun": {
    "id": "gun123",
    "name": "My Competition Gun",
    "brand": "Browning",
    "model": "Citori",
    "gauge": "12",
    "barrelLength": 32,
    "choke": "Modified",
    "action": "Break Action",
    "stock": "Standard",
    "stockMaterial": "Wood",
    "weight": 8.2,
    "sights": "Bead",
    "finish": "Blued",
    "notes": "Competition setup with adjustable comb"
  },
  "club": {
    "club_id": "club123",
    "name": "Springfield Gun Club",
    "admin_id": "user456",
    "created_at": "2024-04-27T10:00:00Z"
  },
  "user": {
    "user_id": "user789",
    "email": "john@example.com",
    "name": "John Doe",
    "role": "user",
    "club_id": "club123",
    "created_at": "2024-04-27T10:00:00Z"
  },
  "score": {
    "score_id": "score123",
    "user_id": "user789",
    "club_id": "club123",
    "game": "Trap",
    "gauge": "12",
    "date": "2024-04-27T10:00:00Z",
    "starting_stand": 3,
    "total_score": 24,
    "birds": ["hit", "miss", "hit"],
    "created_at": "2024-04-27T10:00:00Z"
  }
}
{
  "shooter_id": "12345",
  "name": "John Doe",
  "handicap": 2,
  "scores": [
    {
      "game": "Trap",
      "gauge": "12",
      "date": "2024-12-27",
      "starting_stand": 3,
      "total_score": 24,
      "birds": ["hit", "miss", "hit", "..."]
    }
  ],
  "statistics": {
    "straights": 5,
    "longest_streak": 31
  }
}
```