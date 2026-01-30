// src/modules/clients/project.controller.ts
import { Request, Response } from "express";
import { Project } from "./project.model";

// Create new project
export const createProject = async (req: Request, res: Response) => {
  try {
    const {
      name,
      service,
      description,
      expectedCompletion,
      timeline
    } = req.body;
    const clientId = req.user?.userId;
    const clientName = req.user?.name || "Client";

    // Validation
    if (!name || !service || !description || !expectedCompletion) {
      return res.status(400).json({
        success: false,
        message: "Please provide all required fields: name, service, description, and expected completion date"
      });
    }

    // Create default timeline if not provided
    const defaultTimeline = timeline || [
      { phase: 'Project Submitted', date: new Date(), status: 'completed' },
      { phase: 'Initial Review', date: new Date(Date.now() + 86400000), status: 'pending' },
      { phase: 'In Progress', date: new Date(Date.now() + 86400000 * 3), status: 'pending' },
      { phase: 'Client Review', date: new Date(Date.now() + 86400000 * 7), status: 'pending' },
      { phase: 'Final Delivery', date: new Date(expectedCompletion), status: 'pending' }
    ];

    // Create project
    const project = await Project.create({
      clientId,
      name,
      service,
      description,
      status: 'Submitted',
      progress: 0,
      submissionDate: new Date(),
      expectedCompletion,
      timeline: defaultTimeline,
      updates: [{
        date: new Date(),
        message: `Project "${name}" has been submitted and is pending review.`,
        author: clientName
      }]
    });

    res.status(201).json({
      success: true,
      message: "Project created successfully",
      data: project
    });
  } catch (error: any) {
    console.error('Create project error:', error);
    res.status(500).json({
      success: false,
      message: error.message || "Failed to create project"
    });
  }
};

// Get all projects for logged-in client
export const getClientProjects = async (req: Request, res: Response) => {
  try {
    const clientId = req.user?.userId;

    const projects = await Project.find({ clientId })
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: projects
    });
  } catch (error: any) {
    console.error('Get client projects error:', error);
    res.status(500).json({
      success: false,
      message: error.message || "Failed to fetch projects"
    });
  }
};

// Get single project by ID
export const getProjectById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const clientId = req.user?.userId;

    const project = await Project.findOne({
      _id: id,
      clientId // Ensure client can only access their own projects
    });

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found"
      });
    }

    res.status(200).json({
      success: true,
      data: project
    });
  } catch (error: any) {
    console.error('Get project error:', error);
    res.status(500).json({
      success: false,
      message: error.message || "Failed to fetch project"
    });
  }
};

// Update project
export const updateProject = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, service, description, status, progress, expectedCompletion, timeline } = req.body;
    const clientId = req.user?.userId;

    const project = await Project.findOne({
      _id: id,
      clientId
    });

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found"
      });
    }

    // Update fields
    if (name) project.name = name;
    if (service) project.service = service;
    if (description) project.description = description;
    if (status) project.status = status;
    if (progress !== undefined) project.progress = progress;
    if (expectedCompletion) project.expectedCompletion = expectedCompletion;
    if (timeline) project.timeline = timeline;

    await project.save();

    res.status(200).json({
      success: true,
      message: "Project updated successfully",
      data: project
    });
  } catch (error: any) {
    console.error('Update project error:', error);
    res.status(500).json({
      success: false,
      message: error.message || "Failed to update project"
    });
  }
};

// Add update/message to project
export const addProjectUpdate = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { message } = req.body;
    const clientId = req.user?.userId;
    const clientName = req.user?.name || "Client";

    if (!message) {
      return res.status(400).json({
        success: false,
        message: "Message is required"
      });
    }

    const project = await Project.findOne({
      _id: id,
      clientId
    });

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found"
      });
    }

    // Add new update
    project.updates.push({
      date: new Date(),
      message,
      author: clientName
    } as any);

    await project.save();

    res.status(200).json({
      success: true,
      message: "Update added successfully",
      data: project
    });
  } catch (error: any) {
    console.error('Add project update error:', error);
    res.status(500).json({
      success: false,
      message: error.message || "Failed to add update"
    });
  }
};

// Delete project
export const deleteProject = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const clientId = req.user?.userId;

    const project = await Project.findOne({
      _id: id,
      clientId
    });

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found"
      });
    }

    await Project.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: "Project deleted successfully"
    });
  } catch (error: any) {
    console.error('Delete project error:', error);
    res.status(500).json({
      success: false,
      message: error.message || "Failed to delete project"
    });
  }
};